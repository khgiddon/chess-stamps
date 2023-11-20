import React from 'react';
import MemoizedRow from './Row';
import { percentageToOneInEveryX, customRoundForRatio, listToCleanList, percentageToRarity } from '../utilityFunctions';

const DisplayTable = ({ data }) => {
  if (!data.most_popular_missing_stamp) return null;

  return (
    <div className="grid-container">
      <MemoizedRow
        label="Most popular missing stamp"
        opening={data.most_popular_missing_stamp.name}
        fen={data.most_popular_missing_stamp.fen}
        rarity={percentageToRarity(data.most_popular_missing_stamp.all_pct)}
        id={1}
        text={
          <>
            You've never played this, but it's {percentageToOneInEveryX(data.most_popular_missing_stamp.all_pct)} Lichess stamps.
            The other most popular stamps you're missing are: {listToCleanList(data.other_missing_stamps)}.
            Happy hunting!
          </>
        }
      />
      <MemoizedRow
        label="Rarest collected stamp"
        opening={data.most_obscure_stamp.name}
        fen={data.most_obscure_stamp.fen}
        pgn={data.most_obscure_stamp.pgn}
        rarity={percentageToRarity(data.most_obscure_stamp.all_pct)}
        id={2}
        text={`You've played this ${data.most_obscure_stamp.player_total_with_children} times. This is only ${percentageToOneInEveryX(data.most_obscure_stamp.all_pct)} Lichess stamps! What a find!`}
      />
      <MemoizedRow
        label="Specialist: white"
        label_description="(most played relative to population)"
        opening={data.most_popular_white.name}
        fen={data.most_popular_white.fen}
        pgn={data.most_popular_white.pgn}
        rarity={percentageToRarity(data.most_popular_white.all_pct)}
        id={3}
        text={`You've played this ${data.most_popular_white.player_white_with_children} times, or ${percentageToOneInEveryX(data.most_popular_white.player_pct_with_children)} stamps. This is only ${percentageToOneInEveryX(data.most_popular_white.all_pct)} of all Lichess stamps. You play it ${customRoundForRatio(data.most_popular_white.player_pct_with_children/data.most_popular_white.all_pct)}x as frequently as the population.`}
      />
      <MemoizedRow
        label="Specialist: black"
        label_description="(most played relative to population)"
        opening={data.most_popular_black.name}
        fen={data.most_popular_black.fen}
        pgn={data.most_popular_black.pgn}
        rarity={percentageToRarity(data.most_popular_black.all_pct)}
        id={4}
        text={`You've played this ${data.most_popular_black.player_black_with_children} times, or ${percentageToOneInEveryX(data.most_popular_black.player_pct_with_children)} stamps. This is only ${percentageToOneInEveryX(data.most_popular_black.all_pct)} of all Lichess stamps. You play it ${customRoundForRatio(data.most_popular_black.player_pct_with_children/data.most_popular_black.all_pct)}x as frequently as the population.`}
      />
      <MemoizedRow
        label="Favorite stamp: white"
        label_description="(most played relative to population, min. 10 games)"
        opening={data.most_popular_white_min10.name}
        fen={data.most_popular_white_min10.fen}
        pgn={data.most_popular_white_min10.pgn}
        rarity={percentageToRarity(data.most_popular_white_min10.all_pct)}
        id={5}
        text={data.most_popular_white_min10.name !== 'None' ? 
              `You've played this ${data.most_popular_white_min10.player_white_with_children} times,
              or ${percentageToOneInEveryX(data.most_popular_white_min10.player_pct_with_children)} stamps.
              That means you play it ${customRoundForRatio(data.most_popular_white_min10.player_pct_with_children/data.most_popular_white_min10.all_pct)}x as frequently as the population.`
              : "You haven't played any opening as white ten times."}
      />
      <MemoizedRow
        label="Favorite stamp: black"
        label_description="(most played relative to population, min. 10 games)"
        opening={data.most_popular_black_min10.name}
        fen={data.most_popular_black_min10.fen}
        pgn={data.most_popular_black_min10.pgn}
        rarity={percentageToRarity(data.most_popular_black_min10.all_pct)}
        id={6}
        text={data.most_popular_black_min10.name !== 'None' ?
              `You've played this ${data.most_popular_black_min10.player_black_with_children} times,
              or ${percentageToOneInEveryX(data.most_popular_black_min10.player_pct_with_children)} stamps.
              That means you play it ${customRoundForRatio(data.most_popular_black_min10.player_pct_with_children/data.most_popular_black_min10.all_pct)}x as frequently as the population.`
              : "You haven't played any opening as black ten times."}
      />
      <MemoizedRow
        label="Random collected stamp"
        opening={data.random_collected.name}
        fen={data.random_collected.fen}
        pgn={data.random_collected.pgn}
        rarity={percentageToRarity(data.random_collected.all_pct)}
        id={7}
        text={data.random_collected.name !== 'None' ?
              `You've played this ${data.random_collected.player_total_with_children} times,
              or ${percentageToOneInEveryX(data.random_collected.player_pct_with_children)} stamps.
              This is played ${percentageToOneInEveryX(data.random_collected.all_pct)} Lichess stamps.
              You play it ${customRoundForRatio(data.random_collected.player_pct_with_children/data.random_collected.all_pct)}x as frequently as the population.`
              : "Error."}
      />
      <MemoizedRow
        label="Random missing stamp"
        opening={data.random_missing.name}
        fen={data.random_missing.fen}
        pgn={data.random_missing.pgn}
        rarity={percentageToRarity(data.random_missing.all_pct)}
        id={8}
        text={data.random_missing.name !== 'None' ?
              `This is played ${percentageToOneInEveryX(data.random_missing.all_pct)} Lichess stamps, but you've never played this.`
              : "Error."}
      />
    </div>
  );
};

export default DisplayTable;
