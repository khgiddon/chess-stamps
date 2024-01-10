import React from 'react';
import { formatPercentage } from '../utilityFunctions';
import { addThousandsSeparator } from '../utilityFunctions';
import { BarChart } from '@mui/x-charts/BarChart';
import Stack from '@mui/material/Stack';
import BarChartIcon from '@mui/icons-material/BarChart';



const ResultsSummary = ({ data, username, timeframe }) => {

  const usernameMapping = {
    'drnykterstein': 'DrNykterstein (aka Magnus Carlsen)',
    'rebeccaharris': 'RebeccaHarris (aka Daniel Naroditsky)',
    'alireza2003': 'alireza2003',
    'nihalsarin2004': 'nihalsarin2004',
  };

  const displayUsername = usernameMapping[username.toLowerCase()] || username;

  const displayTimeframeMapping = {
    'last 24 hours': 'over the last 24 hours',
    'last week': 'over the last week',
    'last month': 'over the last month',
    'last 3 months': 'over the last 3 months',
    'last 12 months': 'over the last 12 months',
    'forever': 'since forever',
  };
  

  const displayTimeframe = username in usernameMapping ? 'since forever' : displayTimeframeMapping[timeframe];

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
    val: 1251, /* ACTUAL Jan 8 2024 */ 
    cat: 'GM Sarin',
  },    
    {
      val: 1098, /* ACTUAL Jan 8 2024 */ 
      cat: 'GM Carlsen',
    },    
    {
      val: 1059, /* ACTUAL Jan 8 2024 */ 
      cat: 'GM Naroditsky',
    }, 
    {
      val: 1024,/* ACTUAL Jan 8 2024 */ 
      cat: 'GM Firouzja',
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

  console.log(timeframe);
  console.log(displayTimeframe);

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
            <li>Analyzed <b>{addThousandsSeparator(data.total_stamps)}</b> opening stamps from <b>{addThousandsSeparator(data.total_games)}</b> games played by <b>{displayUsername}</b> {displayTimeframe}.</li>
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