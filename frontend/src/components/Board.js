import React from 'react';
import '../App.css';
import Box from './Box';

export default function Board(props) {
  const { boardState, updateBoardState } = props;

  return (
    <div className="BoardContainer">
      {boardState.map((row, rowIndex) => (
        <div key={rowIndex} className="BoardRowContainer">
          {row.map((cell, colIndex) => (
            <Box
              key={`${rowIndex}-${colIndex}`}
              state={cell}
              row={rowIndex}
              col={colIndex}
              updateBoardState={updateBoardState}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
