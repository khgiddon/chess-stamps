import React from 'react';
import { formatPercentage } from '../utilityFunctions';
import { addThousandsSeparator } from '../utilityFunctions';
import { BarChart } from '@mui/x-charts/BarChart';
import Stack from '@mui/material/Stack';
import BarChartIcon from '@mui/icons-material/BarChart';



const ResultsSummary = ({ data, username }) => {

  const usernameMapping = {
    'drnykterstein': 'DrNykterstein (aka Magnus Carlsen)',
    'rebeccaharris': 'RebeccaHarris (aka Daniel Naroditsky)',
    'alireza2003': 'alireza2003',
  };

  const displayUsername = usernameMapping[username.toLowerCase()] || username;


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
  ...(username in usernameMapping ? [] : [{
    val: data.unique_stamps,
    cat: username,
    color: '#1976d2',
  }]),
  {
    val: 1098, /* ACTUAL Jan 8 2024 */ 
    cat: 'Carlsen',
  },    
    {
      val: 1098, /* ACTUAL Jan 8 2024 */ 
      cat: 'Carlsen',
    },    
    {
      val: 1059, /* ACTUAL Jan 8 2024 */ 
      cat: 'Naroditsky',
    }, 
    {
      val: 1024,/* ACTUAL Jan 8 2024 */ 
      cat: 'Firouzja',
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
        margin={{ left: 100 , top: 0}}
        colors={[
          '#2074d4']}
        {...chartSetting}
        
      />
    );
  }

  if (!data.total_stamps) return null;

  return (
    <div className='results-summary-parent-container'>
      <div className='results-summary-container'>
          <h2>
          <Stack direction="row" alignItems="center" gap={1} justifyContent="center">
            Summary statistics
            <BarChartIcon color="primary"/>
            </Stack>
          </h2>
        <div className="summaryText">
          <ul>
            <li>Analyzed <b>{addThousandsSeparator(data.total_stamps)}</b> opening stamps from <b>{addThousandsSeparator(data.total_games)}</b> games played by <b>{displayUsername}</b>.</li>
            <li>You've collected <b>{addThousandsSeparator(data.unique_stamps)}</b> unique stamps out of <b>{addThousandsSeparator(data.unique_stamps_all)}</b> possible stamps, or <b>{formatPercentage(data.unique_stamps/data.unique_stamps_all)}%</b> of all stamps.</li>
          </ul>
        </div>
        <div className="summaryChart">
          {horizontalBars()}
        </div>  
      </div>
    </div>
  );
};

export default ResultsSummary;