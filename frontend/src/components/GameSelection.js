import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
      <GameSelectionContainer>
        <Overlay>
          <Title>Welcome to Tic Tac Toe</Title>
          <Description>Select a game mode to get started.</Description>
          <RadioLabel>
            <input
                type="radio"
                value={GAME_MODE.OFFLINE}
                checked={selectedOption === GAME_MODE.OFFLINE}
                onChange={handleOptionChange}
            />
            Play Offline
          </RadioLabel>
          <RadioLabel>
            <input
                type="radio"
                value={GAME_MODE.ONLINE}
                checked={selectedOption === GAME_MODE.ONLINE}
                onChange={handleOptionChange}
            />
            Play Online
          </RadioLabel>
          <StartButton onClick={handleStartGame}>
            Start Game
          </StartButton>
        </Overlay>
      </GameSelectionContainer>
  );
};

export default GameSelection;

const GameSelectionContainer = styled.div`
  height: calc(100vh - 60px);
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 36px;
  color: white;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 20px;
  color: white;
  margin-bottom: 20px;
`;

const RadioLabel = styled.label`
  display: block;
  margin: 10px 0;
  color: white;
  font-size: 18px;

  input {
    margin-right: 10px;
  }
`;

const StartButton = styled.button`
  background-color: #007BFF;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;
