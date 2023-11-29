// Dashboard.js

import React, {useState} from 'react';
import ProfilePicture from '../components/ProfilePicture';
import LiveActivityButton from '../components/LiveActivityButton';
import ViewHistoryButton from '../components/ViewHistoryButton';
import AlertsBox from '../components/AlertsBox';
import {Line} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const fakeData = [
  {timestamp: 1701293497923, BPM: 50},
  {timestamp: 1701293527923, BPM: 80},
  {timestamp: 1701293557923, BPM: 60},
  {timestamp: 1701293587923, BPM: 70}
]

const chartOptions = {
  responsive: true,
  title: {
    display: true,
    text: 'Heart Rate: Live',
  },
}



function Dashboard() {
  const [data, setData] = useState(fakeData)
  const labels = data.map(e => {
    const dateObj = new Date(e.timestamp);
    return `${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`
    
  })


  return (
    <div className='home'>
      <div className='dashboard-top'>
        <ProfilePicture />
      </div>

      <div className='dashboard-bottom'>
        <div className='dashboard-graph-box'>
          <Line options={chartOptions} data={{
            labels, 
            datasets: [{
              data: data.map(e => [e.timestamp, e.BPM])
            }]
          }}/>

        </div>
        <div className='dashboard-bottom-right'>
          <LiveActivityButton/>
          <ViewHistoryButton/>
          <AlertsBox/>

        </div>
      </div>

    </div>
  );
}

export default Dashboard;
