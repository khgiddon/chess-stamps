import React from 'react';
import { formatPercentage } from '../utilityFunctions';

const ResultsSummary = ({ data, username }) => {
  if (!data.total_stamps) return null;

  return (
    <div>
      <p className="summaryText">
        Analyzed <b>{data.total_stamps}</b> opening stamps from <b>{data.total_games}</b> games played by <b>{username}</b>.
        <br/><br/>
        You've collected <b>{data.unique_stamps}</b> unique stamps out of <b>{data.unique_stamps_all}</b> possible stamps, or <b>{formatPercentage(data.unique_stamps/data.unique_stamps_all)}%</b> of all stamps.
      </p>
    </div>
  );
};

export default ResultsSummary;