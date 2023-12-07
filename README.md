<a name="readme-top"></a>



<!-- ABOUT THE PROJECT -->
## About The Project

WakeWheel is an innovative solution designed to enhance driver safety and well-being by integrating heartbeat sensors into a steering wheel cover. This device is equipped to monitor the driver's heartbeat in real-time, providing an effective means to prevent drowsiness and promote alert driving. Additionally, it is designed to seamlessly communicate with a React frontend through Firebase, allowing for timely alerts and notifications.
<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* React
* Node.js
* Firebase
* Arduino

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

The hardware file is arduino.ino. Upload this to your ESP board. 

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone https://github.com/PranavKopparthy/F23_IOT_Safety.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Install FIrebase packages
   ```sh
   npm -g install firebase-tools
   firebase login
   firebase init
    ```
4. You will need to make an .env.local file inside frontend to store certain credentials for your app safely. Never push Firebase credentials to GitHub!
   ```sh
   REACT_APP_AUTH_DOMAIN=""
   REACT_APP_DATABASE_URL=""
   REACT_APP_PROJECT_ID=""
   REACT_APP_STORAGE_BUCKET=""
   REACT_APP_MESSAGING_SENDER_ID=""
   REACT_APP_ID=""
    ```
5. Upload Arduino.ino to esp
   ```sh
   1. Install Arduino IDE:
      Download and install the Arduino IDE from https://www.arduino.cc/en/software.
   2. Install ESP32 Board Support:
      Open the Arduino IDE, go to "File" -> "Preferences," and add the following URL to the "Additional Boards Manager URLs"       field:
      https://dl.espressif.com/dl/package_esp32_index.json
   3. Install Required Libraries:
      Install the necessary libraries for your Arduino project. Open the Arduino IDE, go to "Sketch" -> "Include Library" ->       "Manage Libraries," and install the following          libraries:
      Adafruit MPU6050
      Firebase ESP8266
   4. Upload Code to ESP32
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Important Files -->
## Dashboard.js
File Link: [https://github.com/PranavKopparthy/F23_IOT_Safety/blob/main/src/pages/Dashboard.js]

## App.js
File Link: [https://github.com/PranavKopparthy/F23_IOT_Safety/blob/main/src/App.js]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact
Project Link: [https://github.com/PranavKopparthy/F23_IOT_Safety.git]

<p align="right">(<a href="#readme-top">back to top</a>)</p>
