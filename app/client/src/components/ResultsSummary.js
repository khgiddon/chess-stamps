import React from 'react';
import { formatPercentage } from '../utilityFunctions';
import { addThousandsSeparator } from '../utilityFunctions';
import { BarChart } from '@mui/x-charts/BarChart';
import Stack from '@mui/material/Stack';
import BarChartIcon from '@mui/icons-material/BarChart';



const ResultsSummary = ({ data, username }) => {

  const chartSetting = {
    xAxis: [
      {
        min: 0
        , max: data.unique_stamps_all
        , label: 'Played unique stamps' 
        , tickInterval: [1000,2000,data.unique_stamps_all]
      },
    ],
    height: 200,    
  };
  const dataset = [
    {
      val: data.unique_stamps,
      cat: username,
    },
    {
      val: 1023,
      cat: 'Carlsen',
    },    
    {
      val: 1223,
      cat: 'Nakamura',
    },   
    {
      val: 2023,
      cat: 'Naroditsky',
    },           
  ];
  
  const horizontalBars = () => {
    return (
      <BarChart
        dataset={dataset}
        yAxis={[{ scaleType: 'band', dataKey: 'cat' }]}
        series={[{ dataKey: 'val', label: 'Played unique stamps'}]}
        layout="horizontal"
        slotProps={{ legend: { hidden: 'True' } }}
        {...chartSetting}
      />
    );
  }

  if (!data.total_stamps) return null;

  return (
    <div className='results-summary-parent-container'>
      <div className='results-summary-container'>
        <span className="summaryTitle">
          <h2>
          <Stack direction="row" alignItems="center" gap={1}>
            Overall statistics
            <BarChartIcon color="primary"/>
            </Stack>
          </h2>
          </span>  
        <div className="summaryText">
          Analyzed <b>{addThousandsSeparator(data.total_stamps)}</b> opening stamps from <b>{addThousandsSeparator(data.total_games)}</b> games played by <b>{username}</b>.
          <br/><br/>
          You've collected <b>{addThousandsSeparator(data.unique_stamps)}</b> unique stamps out of <b>{addThousandsSeparator(data.unique_stamps_all)}</b> possible stamps, or <b>{formatPercentage(data.unique_stamps/data.unique_stamps_all)}%</b> of all stamps.
        </div>

        <div className="summaryChart">
          {horizontalBars()}
        </div>  
      </div>
    </div>
  );
};

export default ResultsSummary;