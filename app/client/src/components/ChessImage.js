import React, { useEffect } from 'react';
import { Chessboard } from 'react-chessboard';

const ChessImage = React.memo(({ fen, id }) => {
  useEffect(() => {
    //console.log('ChessImage rendered', { fen, id })
  }, [fen, id]);

  return (
    <Chessboard
      position={fen}
      id={id}
      arePiecesDraggable={false}
    />
  );
});

export default ChessImage;