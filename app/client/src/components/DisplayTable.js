import React from 'react';
import MemoizedRow from './Row';
// import CollectionsIcon from '@mui/icons-material/Collections';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { percentageToOneInEveryX, customRoundForRatio, listToCleanList, percentageToRarity, timesPluralization } from '../utilityFunctions';

const DisplayTable = ({ data, username }) => {

  const usernameMapping = {
    'drnykterstein': 'Magnus Carlsen',
    'rebeccaharris': 'Daniel Naroditsky',
    'alireza2003': 'Alireza Firouzja',
    'nihalsarin2004': 'Nihal Sarin',
  };

  const displayUsername = usernameMapping[username.toLowerCase()] || username;

  if (!data.most_popular_missing_stamp) return null;

  return (
    <div className="grid-outer-container">
         
          <Stack direction="row" alignItems="center" gap={1} justifyContent="space-between">
  <Box flexGrow={1}>
  <h2>{displayUsername}'s stamp collection</h2>
  </Box>
</Stack>
          

      <div className="grid-container">
        <MemoizedRow
          label="Most popular missing stamp"
          opening={data.most_popular_missing_stamp.name}
          fen={data.most_popular_missing_stamp.fen}
          pgn={data.most_popular_missing_stamp.pgn}
          ply={data.most_popular_missing_stamp.ply}        
          rarity={percentageToRarity(data.most_popular_missing_stamp.all_pct)}
          popularity_rank={data.most_popular_missing_stamp.popularity_rank}
          unique_stamps_all={data.unique_stamps_all}
          id={1}
          text={
            <>
              You've never played this, but it's {percentageToOneInEveryX(data.most_popular_missing_stamp.all_pct)} Lichess stamps.
              Happy hunting!
            </>
          }
        />
        <MemoizedRow
          label="Rarest collected stamp"
          opening={data.most_obscure_stamp.name}
          fen={data.most_obscure_stamp.fen}
          pgn={data.most_obscure_stamp.pgn}
          ply={data.most_obscure_stamp.ply}
          rarity={percentageToRarity(data.most_obscure_stamp.all_pct)}
          popularity_rank={data.most_obscure_stamp.popularity_rank}
          unique_stamps_all={data.unique_stamps_all}
          id={2}
          text={`You've played this ${timesPluralization(data.most_obscure_stamp.player_total_with_children)}. This is only ${percentageToOneInEveryX(data.most_obscure_stamp.all_pct)} Lichess stamps! What a find!`}
        />
        <MemoizedRow
          label="Specialist: white"
          label_description="(most played relative to population)"
          opening={data.most_popular_white.name}
          fen={data.most_popular_white.fen}
          pgn={data.most_popular_white.pgn}
          ply={data.most_popular_white.ply}
          rarity={percentageToRarity(data.most_popular_white.all_pct)}
          popularity_rank={data.most_popular_white.popularity_rank}
          unique_stamps_all={data.unique_stamps_all}
          id={3}
          text={data.most_popular_white.name !== 'None' ?
            `You've played this ${timesPluralization(data.most_popular_white.player_white_with_children)}, or ${percentageToOneInEveryX(data.most_popular_white.player_pct_with_children)} stamps. This is only ${percentageToOneInEveryX(data.most_popular_white.all_pct)} Lichess stamps. You play it ${customRoundForRatio(data.most_popular_white.player_pct_with_children/data.most_popular_white.all_pct)}x as frequently as the population.`
          : `You haven't played any opening as white.`  
          }        />
        <MemoizedRow
          label="Specialist: black"
          label_description="(most played relative to population)"
          opening={data.most_popular_black.name}
          fen={data.most_popular_black.fen}
          pgn={data.most_popular_black.pgn}
          ply={data.most_popular_black.ply}
          rarity={percentageToRarity(data.most_popular_black.all_pct)}
          popularity_rank={data.most_popular_black.popularity_rank}
          unique_stamps_all={data.unique_stamps_all}
          id={4}
          text={data.most_popular_black.name !== 'None' ?
            `You've played this ${timesPluralization(data.most_popular_black.player_black_with_children)}, or ${percentageToOneInEveryX(data.most_popular_black.player_pct_with_children)} stamps. This is only ${percentageToOneInEveryX(data.most_popular_black.all_pct)} Lichess stamps. You play it ${customRoundForRatio(data.most_popular_black.player_pct_with_children/data.most_popular_black.all_pct)}x as frequently as the population.`
          : `You haven't played any opening as black.`  
          }
        />
        <MemoizedRow
          label="Favorite stamp: white"
          label_description="(most played relative to population, min. 10 games)"
          opening={data.most_popular_white_min10.name}
          fen={data.most_popular_white_min10.fen}
          pgn={data.most_popular_white_min10.pgn}
          ply={data.most_popular_white_min10.ply}
          rarity={percentageToRarity(data.most_popular_white_min10.all_pct)}
          popularity_rank={data.most_popular_white_min10.popularity_rank}
          unique_stamps_all={data.unique_stamps_all}
          id={5}
          text={data.most_popular_white_min10.name !== 'None' ? 
                `You've played this ${timesPluralization(data.most_popular_white_min10.player_white_with_children)},
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
          ply={data.most_popular_black_min10.ply}
          rarity={percentageToRarity(data.most_popular_black_min10.all_pct)}
          popularity_rank={data.most_popular_black_min10.popularity_rank}
          unique_stamps_all={data.unique_stamps_all}
          id={6}
          text={data.most_popular_black_min10.name !== 'None' ?
                `You've played this ${timesPluralization(data.most_popular_black_min10.player_black_with_children)},
                or ${percentageToOneInEveryX(data.most_popular_black_min10.player_pct_with_children)} stamps.
                That means you play it ${customRoundForRatio(data.most_popular_black_min10.player_pct_with_children/data.most_popular_black_min10.all_pct)}x as frequently as the population.`
                : "You haven't played any opening as black ten times."}
        />
        <MemoizedRow
          label="Least favorite stamp"
          label_description="(played at least once, least played relative to population)"
          opening={data.least_favorite_played.name}
          fen={data.least_favorite_played.fen}
          pgn={data.least_favorite_played.pgn}
          ply={data.least_favorite_played.ply}
          rarity={percentageToRarity(data.least_favorite_played.all_pct)}
          popularity_rank={data.least_favorite_played.popularity_rank}
          unique_stamps_all={data.unique_stamps_all}
          id={7}
          text={data.least_favorite_played.name !== 'None' ?
                `You've played this ${timesPluralization(data.least_favorite_played.player_total_with_children)},
                or ${percentageToOneInEveryX(data.least_favorite_played.player_pct_with_children)} stamps.
                This is ${percentageToOneInEveryX(data.least_favorite_played.all_pct)} Lichess stamps.
                That means you play it ${customRoundForRatio(data.least_favorite_played.player_pct_with_children/data.least_favorite_played.all_pct)}x as frequently as the population.`
                : "Error."}
        />
        <MemoizedRow
          label="Deepest line"
          label_description="(most moves in a played stamp)"
          opening={data.deepest_ply.name}
          fen={data.deepest_ply.fen}
          pgn={data.deepest_ply.pgn}
          ply={data.deepest_ply.ply}
          rarity={percentageToRarity(data.deepest_ply.all_pct)}
          popularity_rank={data.deepest_ply.popularity_rank}
          unique_stamps_all={data.unique_stamps_all}
          id={8}
          text={data.deepest_ply.name !== 'None' ?
                `This opening is ${data.deepest_ply.ply} ply (half-moves) deep!
                You've played this ${timesPluralization(data.deepest_ply.player_total_with_children)},
                or ${percentageToOneInEveryX(data.deepest_ply.player_pct_with_children)} stamps.
                That means you play it ${customRoundForRatio(data.deepest_ply.player_pct_with_children/data.deepest_ply.all_pct)}x as frequently as the population.`
                : "You haven't played any opening as black ten times."}
        />
        <MemoizedRow
          label="Random collected stamp"
          opening={data.random_collected.name}
          fen={data.random_collected.fen}
          pgn={data.random_collected.pgn}
          ply={data.random_collected.ply}
          rarity={percentageToRarity(data.random_collected.all_pct)}
          popularity_rank={data.random_collected.popularity_rank}
          unique_stamps_all={data.unique_stamps_all}
          id={9}
          text={data.random_collected.name !== 'None' ?
                `You've played this ${timesPluralization(data.random_collected.player_total_with_children)},
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
          ply={data.random_missing.ply}
          rarity={percentageToRarity(data.random_missing.all_pct)}
          popularity_rank={data.random_missing.popularity_rank}
          unique_stamps_all={data.unique_stamps_all}
          id={10}
          text={data.random_missing.name !== 'None' ?
                `This is played ${percentageToOneInEveryX(data.random_missing.all_pct)} Lichess stamps, but you've never played this.`
                : "Error."}
        />
      </div>
    </div>

  );
};

export default DisplayTable;
