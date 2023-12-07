// Dashboard.js

import React, {useState} from 'react';
import ProfilePicture from '../components/ProfilePicture';
import LiveActivityButton from '../components/LiveActivityButton';
import ViewHistoryButton from '../components/ViewHistoryButton';
import AlertsBox from '../components/AlertsBox';
import DriverInformation from '../components/DriverInformation';
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

const chartPlugins = {
  legend: {display: false},
  title: {
    display: true,
    text: 'Heart Rate',
  },
}

const chartOptions = {
  responsive: true,
  
  borderColor: "#FF70D7",
  plugins: chartPlugins

}




function Dashboard(props) {
  const [viewingArchive, setViewingArchive] = useState(false)
  const nowStamp = Date.now()
  
  function generateLabels(data) {
    return data && data.map(e => {
      const dateObj = new Date(e.timestamp);
      return `${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`
    })
  }


  return (
    <div className='home'>
      <div className='dashboard-top'>
        <ProfilePicture />
      </div>
      <div className='dashboard-bottom'>
        <div className='dashboard-graph-box'>
          <h2>{viewingArchive ? "Archive" : props.bpmData ? "Heart Rate: Live" : "No Ongoing Drive"}</h2>
          {viewingArchive ? 
            props.archive && props.archive.map(chart => <Line
              options={chartOptions}
              data={{
                labels: generateLabels(chart),
                datasets: [{data: chart.map(e => [e.timestamp, e.bpm])}],
              }}
            />)
            : props.bpmData &&
            <Line options={chartOptions} data={{
              labels: generateLabels(props.bpmData), 
              datasets: [{
                data: props.bpmData ? props.bpmData.map(e => [e.timestamp, e.bpm]) : []
              }]
            }}/>
          }

        </div>
        <div className='dashboard-bottom-right'>
          <DriverInformation/>
          <ViewHistoryButton viewingArchive={viewingArchive} onClick={() => setViewingArchive(prev => !prev)}/>
          <LiveActivityButton/>
          <AlertsBox/>

        </div>
      </div>

    </div>
  );
}

export default Dashboard;
