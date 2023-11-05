import React from 'react';
import MemoizedRow from './Row';
import { percentageToOneInEveryX, customRoundForRatio, formatPercentage, listToCleanList } from '../utilityFunctions';
const DisplayTable = ({ data }) => {
  if (!data.most_popular_missing_stamp) return null;

  return (
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th style={{width:'15%',padding:'0px'}}>Image</th>
        <th>Details</th>
      </tr>
    </thead>
    <tbody>
      <MemoizedRow
        label="Missing stamp"
        opening={data.most_popular_missing_stamp.name}
        fen={data.most_popular_missing_stamp.fen}
        id={1}
        text={
        <>
        The most popular stamp you're missing is the <span className="openingHighlight">{data.most_popular_missing_stamp.name}</span>. 
        You've never played this, but it's played in {percentageToOneInEveryX(data.most_popular_missing_stamp.all_pct)} of all Lichess games.
        The other most popular stamps you're missing are: <span className="openingHighlight">{listToCleanList(data.other_missing_stamps)}</span>.
        Happy hunting!
        </>
        }
      />
      <MemoizedRow
        label="Rarest stamp"
        opening={data.most_obscure_stamp.name}
        fen={data.most_obscure_stamp.fen}
        id={2}
        text={`The most obscure stamp you've collected is the ${data.most_obscure_stamp.name}.  You've played this ${data.most_obscure_stamp.player_total_with_children} times. This is only ${percentageToOneInEveryX(data.most_obscure_stamp.all_pct)} Lichess stamps!`}
      />
      <MemoizedRow
        label="Secret weapon: white"
        label_description="(most played relative to population)"
        opening={data.most_popular_white.name}
        fen={data.most_popular_white.fen}
        id={3}
        text={`You've played this ${data.most_popular_white.player_white_with_children} times, or ${percentageToOneInEveryX(data.most_popular_white.player_pct_with_children)} stamps. This is only ${percentageToOneInEveryX(data.most_popular_white.all_pct)} of all Lichess stamps. You play it ${customRoundForRatio(data.most_popular_white.player_pct_with_children/data.most_popular_white.all_pct)}x as frequently.`}
      />
      <MemoizedRow
        label="Secret weapon: black"
        label_description="(most played relative to population)"
        opening={data.most_popular_black.name}
        fen={data.most_popular_black.fen}
        id={4}
        text={`You've played this ${data.most_popular_black.player_black_with_children} times, or ${percentageToOneInEveryX(data.most_popular_black.player_pct_with_children)} stamps. This is only ${percentageToOneInEveryX(data.most_popular_black.all_pct)} of all Lichess stamps. You play it ${customRoundForRatio(data.most_popular_black.player_pct_with_children/data.most_popular_black.all_pct)}x as frequently.`}
      />
      <MemoizedRow
        label="Repertoire: white"
        label_description="(most played relative to population, min. 10 games)"
        opening={data.most_popular_white_min10.name}
        fen={data.most_popular_white_min10.fen}
        id={5}
        text={`You've played this ${data.most_popular_white_min10.player_white_with_children} times,
               or ${percentageToOneInEveryX(data.most_popular_white_min10.player_pct_with_children)} stamps.
              That means you play it ${customRoundForRatio(data.most_popular_white_min10.player_pct_with_children/data.most_popular_white_min10.all_pct)}x as frequently as the population.`}
        />
      <MemoizedRow
        label="Repertoire: black"
        label_description="(most played relative to population, min. 10 games)"
        opening={data.most_popular_black_min10.name}
        fen={data.most_popular_black_min10.fen}
        id={6}
        text={`You've played this ${data.most_popular_black_min10.player_black_with_children} times,
              or ${percentageToOneInEveryX(data.most_popular_black_min10.player_pct_with_children)} stamps.
              That means you play it ${customRoundForRatio(data.most_popular_black_min10.player_pct_with_children/data.most_popular_black_min10.all_pct)}x as frequently as the population.`}
        />
    </tbody>
  </table>
  );
};

export default DisplayTable;