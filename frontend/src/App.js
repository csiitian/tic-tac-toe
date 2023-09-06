import { useState } from 'react';
import './App.css';
import Board from './components/Board';

function App() {
  const GAME_STATE = {
    NOT_STARTED: 'GAME_NOT_STARTED',
    STARTED: 'GAME_STARTED',
    ENDED: 'GAME_ENDED',
  };

  const PLAYER = {
    X: 'PLAYER_X',
    O: 'PLAYER_O',
  };

  const FINAL_STATE = {
    X_WON: 'PLAYER_X_WON',
    O_WON: 'PLAYER_O_WON',
    DRAW: 'MATCH_DRAW',
    ENDED: 'MATCH_ENDED',
  };

  const [boardState, setBoardState] = useState(Array(3).fill(Array(3).fill('')));
  const [player, setPlayer] = useState(null);
  const [gameState, setGameState] = useState(GAME_STATE.NOT_STARTED);
  const [finalState, setFinalState] = useState(null);

  const updateBoardState = (row, col) => {
    if (gameState !== GAME_STATE.STARTED) {
      alert("Please Press  `Start The Game`");
      return;
    }

    const newBoardState = boardState.map((row) => [...row]);
    newBoardState[row][col] = player === PLAYER.X ? 'X' : 'O';
    setBoardState(newBoardState);

    if (checkDraw(newBoardState)) {
      setFinalState(FINAL_STATE.DRAW);
      setGameState(GAME_STATE.ENDED);
    }

    const winner = checkWinner(newBoardState);
    if (winner !== null) {
      setFinalState(winner === (PLAYER.X ? 'X' : 'O') ? FINAL_STATE.X_WON : FINAL_STATE.O_WON);
      setGameState(GAME_STATE.ENDED);
    }

    setPlayer(player === PLAYER.X ? PLAYER.O : PLAYER.X);
  };

  const checkDraw = (board) => board.every((row) => row.every((cell) => cell !== ''));

  const checkWinner = (board) => {
    for (let i = 0; i < 3; i++) {
      if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        return board[i][0];
      }

      if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        return board[0][i];
      }
    }

    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return board[0][0];
    }

    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      return board[0][2];
    }

    return null;
  };

  const handleGameState = () => {
    setBoardState(Array(3).fill(Array(3).fill('')));
    if (gameState === GAME_STATE.NOT_STARTED || gameState === GAME_STATE.ENDED) {
      setGameState(GAME_STATE.STARTED);
      setPlayer(PLAYER.O);
      setFinalState(null);
    } else {
      setGameState(GAME_STATE.NOT_STARTED);
      setFinalState(null);
    }
  };

  return (
    <div className="App">
      <h1>Tic-Tac-Toe Game</h1>
      <p>Click a box to make your move and try to win the game!</p>
      <Board boardState={boardState} updateBoardState={updateBoardState} currentPlayer={player} />
      <div className="GameOverText">
        {finalState === FINAL_STATE.X_WON ? 'Player X Won !!!' : null}
        {finalState === FINAL_STATE.O_WON ? 'Player O Won !!!' : null}
        {finalState === FINAL_STATE.DRAW ? 'Match Draw !!!' : null}
        {finalState === FINAL_STATE.ENDED ? 'Match Ended !!!' : null}
      </div>
      <div className="StartText" onClick={handleGameState}>
        {gameState === GAME_STATE.NOT_STARTED ? 'Start The Game' : gameState === GAME_STATE.STARTED ? 'End The Game' : 'Restart The Game'}
      </div>
    </div>
  );
}

export default App;
