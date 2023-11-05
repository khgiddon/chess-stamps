import React from 'react';
import ChessImage from './ChessImage';

const Row = ({ label, label_description, opening, fen, id, text }) => {
  return (
    <tr>
        <td>
          <div align="center">
            <span className="nameText"><b>{label}</b>:</span><br/>
            {console.log('Text rendered', { fen, id })}
            {/* Add extra line break if name_description is not null  */}
            { label_description? 
              <div><span className="nameDescriptionText">{label_description}</span></div>
            : null
            }          
            <br/>{opening}
          </div>
        </td>
        <td>
          <div>
          <a href={`https://lichess.org/analysis/${fen}`}>
            {<ChessImage
              fen={fen}
              id={id}
              />}
            </a>
          </div>
        </td>
        <td>{text}</td>    </tr>
  );
};

const MemoizedRow = React.memo(Row);
export default MemoizedRow;