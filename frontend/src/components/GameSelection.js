import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GameSelection.css'; // Import your CSS file

const GameSelection = () => {
  
  const navigate = useNavigate();

  const GAME_MODE = {
    OFFLINE: 'offline',
    ONLINE: 'online',
  };

  const [selectedOption, setSelectedOption] = useState(GAME_MODE.OFFLINE);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleStartGame = () => {
    if (selectedOption === GAME_MODE.OFFLINE) {
      navigate('/offline');
    } else {
      navigate('/online');
    }
  };

  return (
    <div className="game-selection">
      <div className="overlay">
        <h2 className="title">Welcome to Tic Tac Toe</h2>
        <p className="description">Select a game mode to get started.</p>
        <label className="radio-label">
          <input
            type="radio"
            value={GAME_MODE.OFFLINE}
            checked={selectedOption === GAME_MODE.OFFLINE}
            onChange={handleOptionChange}
          />
          Play Offline
        </label>
        <label className="radio-label">
          <input
            type="radio"
            value={GAME_MODE.ONLINE}
            checked={selectedOption === GAME_MODE.ONLINE}
            onChange={handleOptionChange}
          />
          Play Online
        </label>

        <button className="start-button" onClick={handleStartGame}>
          Start Game
        </button>
      </div>
    </div>
  );
};

export default GameSelection;
