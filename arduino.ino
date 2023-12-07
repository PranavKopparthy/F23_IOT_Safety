#include <Wire.h>
#include "MAX30105.h"

#include "heartRate.h"

#include <Firebase_ESP_Client.h>
#include <WiFi.h>
#include "time.h"

  // Provide the token generation process info.
#include "addons/TokenHelper.h"
// Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

// Insert your network credentials
#define WIFI_SSID "utexas-iot"
#define WIFI_PASSWORD "10350907021351253598"
//  #define WIFI_SSID "ION-MyCampusNet-2G"
//  #define WIFI_PASSWORD "Keenest-Vehicle-6?"

//Firebase variables
#define API_KEY "AIzaSyAqBT_qyerLZW0Nqab-9hkkvRvMUZ2SyJA"
#define USER_EMAIL "johnmyy4@gmail.com"
#define USER_PASSWORD "Test321!"
#define DATABASE_URL "https://wakewheel-241ba-default-rtdb.firebaseio.com/"

// Define Firebase objects
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

// Variable to save USER UID
String uid;

// Database main path (to be updated in setup with the user UID)
String databasePath;
String timePath = "/timestamp";

// Parent Node (to be updated in every loop)
String parentPath;

long long timestamp = 0;
FirebaseJson json;

const char* ntpServer = "pool.ntp.org";

// Timer variables (send new readings every 100 ms)
unsigned long sendDataPrevMillis = 0;
unsigned long timerDelay = 1000;

MAX30105 particleSensor;

const byte RATE_SIZE = 4; //Increase this for more averaging. 4 is good.
float rates[RATE_SIZE]; //Array of heart rates
byte rateSpot = 0;
long lastBeat = 0; //Time at which the last beat occurred
long lastFirebaseSend = 0;

float beatsPerMinute;
float beatAvg;

void initWiFi() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }
  Serial.println(WiFi.localIP());
  Serial.println();
}


// Function that gets current epoch time
unsigned long getTime() {
  time_t now;
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    //Serial.println("Failed to obtain time");
    return(0);
  }
  time(&now);
  return now;
}

void setup() {
  Serial.begin(115200);
  Serial.println("Initializing...");
  pinMode(D10, OUTPUT);    // sets the digital pin 13 as output
  pinMode(D3, OUTPUT);    // sets the digital pin 13 as output

  // Initialize sensor
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) //Use default I2C port, 400kHz speed
  {
    Serial.println("MAX30105 was not found. Please check wiring/power. ");
    while (1);
  }
  Serial.println("Place your index finger on the sensor with steady pressure.");

  particleSensor.setup(); //Configure sensor with default settings
  particleSensor.setPulseAmplitudeRed(0x0A); //Turn Red LED to low to indicate sensor is running
  particleSensor.setPulseAmplitudeGreen(0); //Turn off Green LED

      initWiFi();
    configTime(0, 0, ntpServer);

    // Assign the api key (required)
    config.api_key = API_KEY;

    // Assign the user sign in credentials
   auth.user.email = USER_EMAIL;
   auth.user.password = USER_PASSWORD;

   // Assign the RTDB URL (required)
   config.database_url = DATABASE_URL;

   Firebase.reconnectWiFi(true);
   fbdo.setResponseSize(4096);

   // Assign the callback function for the long running token generation task */
   config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h

   // Assign the maximum retry of token generation
   config.max_token_generation_retry = 5;

   // Initialize the library with the Firebase authen and config
   Firebase.begin(&config, &auth);

   // Getting the user UID might take a few seconds
   Serial.println("Getting User UID");
   while ((auth.token.uid) == "") {
     Serial.print('.');
      delay(1000);
   }
    // Print user UID
    uid = auth.token.uid.c_str();
    Serial.print("User UID: ");
    Serial.println(uid);

    // Update database path
    databasePath = "/UsersData/" + uid + "/readings";
    lastFirebaseSend = millis();
    lastBeat = millis();
    Serial.println(getTime());
    timestamp = getTime();
    Serial.println("Base timestamp: " + String(timestamp));
}

void loop()
{

  long now = millis();

  long irValue = particleSensor.getIR();
  bool gotBeat = checkForBeat(irValue);
  if (irValue < 50000) {
     digitalWrite(D10, HIGH);    // sets the digital pin 13 as output
     digitalWrite(D3, HIGH);    // sets the digital pin 13 as output
     delay(1000);            // waits for a second
   }
  else{
     digitalWrite(D10, LOW);    // sets the digital pin 13 as output
     digitalWrite(D3, LOW);    // sets the digital pin 13 as output
     delay(1000);            // waits for a second
   }
  if (gotBeat) {
    long delta = now - lastBeat;
    lastBeat = now;
    beatsPerMinute = 60 / (delta / 1000.0);
    Serial.println("BPM: " + String(beatsPerMinute));
    lastFirebaseSend = now;

    // timestamp = getTime();  // Update the timestamp with the current time
    long long totalTime = (long long)now + timestamp*(long long)1000;
    parentPath = databasePath + "/" + String(timestamp) + "/" + String(totalTime);

    Serial.print("time: ");
    Serial.println((long)(timestamp + now));

    // Calculate beats average
    rates[rateSpot++] = beatsPerMinute;
    rateSpot %= RATE_SIZE; // Wrap variable

    // Take average of readings
    beatAvg = 0;
    for (byte x = 0; x < RATE_SIZE; x++)
      beatAvg += rates[x];
    beatAvg /= RATE_SIZE;

    Serial.print("Beats Average: " + String(beatAvg));

    // Set data in JSON
    json.set("/heartRate", String(beatsPerMinute));
    json.set("/beatsAverage", String(beatAvg));

    if (irValue < 50000) {
      Serial.print(" No finger?");
      json.set("/handStatus", "Hands Off");

    } else {
      json.set("/handStatus", "Hands On");
      Serial.printf("Set json... %s\n", Firebase.RTDB.setJSON(&fbdo, parentPath.c_str(), &json) ? "ok" : fbdo.errorReason().c_str());
    }
  }
}