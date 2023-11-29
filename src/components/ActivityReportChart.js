import React from 'react';
import Chart from 'react-apexcharts';
import { ZoomableTimeseries } from 'react-apexcharts';

const ActivityReportChart = () => {
  const options = {
    // Options for your chart (you can customize this based on your needs)
  };

  const series = [
    // Data series for your chart
  ];

  return (
    <div>
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default ActivityReportChart;
