import React from 'react';
import '../App.css';

export default function Box({ state, row, col, winnerBox, updateBoardState }) {
  const handleClick = () => {
    // Check if the box is empty and the game is still ongoing
    if (state === '') {
      // Call the updateBoardState function to update the board
      updateBoardState(row, col);
    }
  };

  return (
    <div className={ winnerBox ? "BoxWinnerContainer" : "BoxContainer" } onClick={handleClick}>
      <p className="BoxText">{state}</p>
    </div>
  );
}
