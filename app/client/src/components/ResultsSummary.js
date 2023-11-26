import React from 'react';
import { formatPercentage } from '../utilityFunctions';
import { addThousandsSeparator } from '../utilityFunctions';

const ResultsSummary = ({ data, username }) => {
  if (!data.total_stamps) return null;

  return (
    <div>
      <p className="summaryText">
        Analyzed <b>{addThousandsSeparator(data.total_stamps)}</b> opening stamps from <b>{addThousandsSeparator(data.total_games)}</b> games played by <b>{username}</b>.
        <br/><br/>
        You've collected <b>{addThousandsSeparator(data.unique_stamps)}</b> unique stamps out of <b>{addThousandsSeparator(data.unique_stamps_all)}</b> possible stamps, or <b>{formatPercentage(data.unique_stamps/data.unique_stamps_all)}%</b> of all stamps.
      </p>
    </div>
  );
};

export default ResultsSummary;