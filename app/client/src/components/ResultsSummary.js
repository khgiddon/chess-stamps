import React from 'react';
import { formatPercentage } from '../utilityFunctions';
import { addThousandsSeparator } from '../utilityFunctions';
import { BarChart } from '@mui/x-charts/BarChart';




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
    height: 150,
    
  };
  const dataset = [
    {
      val: data.unique_stamps,
      cat: username,
    },
    {
      val: data.unique_stamps,
      cat: 'Magnus Carlsen',
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
    <div>
      <div className="summaryText">
        Analyzed <b>{addThousandsSeparator(data.total_stamps)}</b> opening stamps from <b>{addThousandsSeparator(data.total_games)}</b> games played by <b>{username}</b>.
        <br/><br/>
        You've collected <b>{addThousandsSeparator(data.unique_stamps)}</b> unique stamps out of <b>{addThousandsSeparator(data.unique_stamps_all)}</b> possible stamps, or <b>{formatPercentage(data.unique_stamps/data.unique_stamps_all)}%</b> of all stamps.
      </div>

      <div className="summaryChart">
        {horizontalBars()}
      </div>  

    </div>
  );
};

export default ResultsSummary;