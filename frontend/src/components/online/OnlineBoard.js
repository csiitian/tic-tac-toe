import { useState, useEffect, useRef } from "react";
import io from 'socket.io-client';
import MatchPlayer from "./MatchPlayer";
import '../../App.css';
import Board from '../Board';

function OnlineBoard() {
  const backendUrl = process.env.REACT_APP_TIC_TAC_TOE_BACKEND_URL || 'https://tic-tac-toe-backend-alpha.vercel.app';
  console.log(backendUrl);

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

  const REMATCH_STATE = {
    'SELF': 'SELF', // you requested
    'OPPONENT': 'OPPONENT', // opponent requested,
    'BOTH': 'BOTH' // you accepted the opponent's request
  }

  const socketRef = useRef(null);
  const [isMatched, setIsMatched] = useState(null);
  const [matchId, setMatchId] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [turn, setTurn] = useState(null);
  const [boardState, setBoardState] = useState(Array(3).fill(Array(3).fill('')));
  // to change background for matched row, col or diagonal
  const [boardWinnerState, setBoardWinnerState] = useState(Array(3).fill(Array(3).fill(false)));
  const [player, setPlayer] = useState(PLAYER.X);
  const [gameState, setGameState] = useState(GAME_STATE.NOT_STARTED);
  const [finalState, setFinalState] = useState(null);
  const [rematch, setRematch] = useState(null);

  const updateBoardStateByYou = (row, col) => {

    if(turn === opponent) {
      return;
    }

    setBoardState((prevBoardState) => {
      const newBoardState = prevBoardState.map((row) => [...row]);
      newBoardState[row][col] = player === PLAYER.X ? 'X' : 'O';

      const winner = checkWinner(newBoardState);
      if (winner !== null) {
        setFinalState(winner === (PLAYER.X ? 'X' : 'O') ? FINAL_STATE.X_WON : FINAL_STATE.O_WON);
        setGameState(GAME_STATE.ENDED);
      } else if(checkDraw(newBoardState)) {
        setFinalState(FINAL_STATE.DRAW);
        setGameState(GAME_STATE.ENDED);
      }

      return newBoardState;
    });

    setPlayer(player === PLAYER.X ? PLAYER.O : PLAYER.X);

    socketRef.current.emit('event', {
      row: row,
      col: col,
      opponent: opponent
    });

    setTurn(opponent);
  };

  const updateBoardStateByOpponent = (row, col, myTurn) => {

    if(turn === myTurn) {
      return;
    }

    setBoardState((prevBoardState) => {
      const newBoardState = prevBoardState.map((row) => [...row]);
      newBoardState[row][col] = player === PLAYER.X ? 'X' : 'O';

      const winner = checkWinner(newBoardState);
      if (winner !== null) {
        setFinalState(winner === (PLAYER.X ? 'X' : 'O') ? FINAL_STATE.X_WON : FINAL_STATE.O_WON);
        setGameState(GAME_STATE.ENDED);
      } else if(checkDraw(newBoardState)) {
        setFinalState(FINAL_STATE.DRAW);
        setGameState(GAME_STATE.ENDED);
      }

      return newBoardState;
    });

    setPlayer(player === PLAYER.X ? PLAYER.O : PLAYER.X);
    setTurn(myTurn);
  }

  const checkDraw = (board) => board.every((row) => row.every((cell) => cell !== ''));

  const checkWinner = (board) => {
    for (let i = 0; i < 3; i++) {
      if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        const newBoardWinnerState = boardWinnerState.map((row) => [...row]);
        newBoardWinnerState[i][0] = true;
        newBoardWinnerState[i][1] = true;
        newBoardWinnerState[i][2] = true;
        setBoardWinnerState(newBoardWinnerState);
        return board[i][0];
      }

      if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        const newBoardWinnerState = boardWinnerState.map((row) => [...row]);
        newBoardWinnerState[0][i] = true;
        newBoardWinnerState[1][i] = true;
        newBoardWinnerState[2][i] = true;
        setBoardWinnerState(newBoardWinnerState);
        return board[0][i];
      }
    }

    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      const newBoardWinnerState = boardWinnerState.map((row) => [...row]);
      newBoardWinnerState[0][0] = true;
      newBoardWinnerState[1][1] = true;
      newBoardWinnerState[2][2] = true;
      setBoardWinnerState(newBoardWinnerState);
      return board[0][0];
    }

    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      const newBoardWinnerState = boardWinnerState.map((row) => [...row]);
      newBoardWinnerState[0][2] = true;
      newBoardWinnerState[1][1] = true;
      newBoardWinnerState[2][0] = true;
      setBoardWinnerState(newBoardWinnerState);
      return board[0][2];
    }

    return null;
  };

  const handleGameStart = () => {
    setBoardState(Array(3).fill(Array(3).fill('')));
    setBoardWinnerState(Array(3).fill(Array(3).fill(false)));
    setGameState(GAME_STATE.STARTED);
    setPlayer(PLAYER.O);
    setFinalState(null);
    setRematch(null);
  }

  const handleGameEnd = () => {
    console.log("GAME ENDED");
  }

  const handleRematch = () => {
    if(rematch === REMATCH_STATE.OPPONENT) {
      setRematch(REMATCH_STATE.BOTH);
      console.log("HANDLE BOTH");
    } else {
      setRematch(REMATCH_STATE.SELF);
      console.log("HANDLE SELF");
    }
    socketRef.current.emit('rematch', null);
  }

  useEffect(() => {
    socketRef.current = io(backendUrl, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: Infinity
    });

    socketRef.current.on('connect', () => {
      if(matchId === null) {
        socketRef.current.emit('join', null);
      }
    });

    socketRef.current.on('event', (move) => {
      console.log(move);
      const { row, col, opponent } = move;
      updateBoardStateByOpponent(row, col, opponent);
      setTurn(opponent);
    });

    socketRef.current.on('match', (matchData) => {
      const { turn, opponent, matchId } = matchData;
      setIsMatched(true);
      setMatchId(matchId);
      setTurn(turn);
      setOpponent(opponent);
      handleGameStart();
      if(turn === opponent) {
        setPlayer(PLAYER.O);
      }
      console.log(matchData);
    });

    socketRef.current.on('rematch', (data) => {
      if(rematch === REMATCH_STATE.SELF) {
        setRematch(REMATCH_STATE.BOTH);
        console.log("BOTH");
      } else {
        setRematch(REMATCH_STATE.OPPONENT);
        console.log("OPPONENT");
      }
    });

    socketRef.current.on('reconnect', () => {
      if(matchId === null) {
        socketRef.current.emit('join');
      }
      console.log('Socket reconnected');
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if(gameState === GAME_STATE.ENDED) {
      handleGameEnd();
    }
  }, [gameState]);

  useEffect(() => {
    if(rematch === REMATCH_STATE.BOTH) {
      handleGameStart();
    }
  }, [rematch]);

  return (
    <div className="App">
      <h1 className="title">Tic-Tac-Toe Game</h1>
      <p className="description">Click a box to make your move and try to win the game!</p>
      { matchId ? <h1 className="description">Match Id: {matchId}</h1> : null }
      <p className="description">{ isMatched && turn === opponent ? "Opponent's turn" : "It's your turn" }</p>
      {
        isMatched ? <Board boardState={boardState} boardWinnerState={boardWinnerState} updateBoardState={updateBoardStateByYou} currentPlayer={player} /> : <MatchPlayer />
      }
      <div className="GameOverText">
        {finalState === FINAL_STATE.X_WON ? 'You learned one more way to not lose the match !!!' : null}
        {finalState === FINAL_STATE.O_WON ? 'You won, Keep it up !!!' : null}
        {finalState === FINAL_STATE.DRAW ? 'Match Draw !!!' : null}
        {finalState === FINAL_STATE.ENDED ? 'Match Ended !!!' : null}
      </div>
      { gameState === GAME_STATE.ENDED
          ? <button className="start-button" onClick={handleRematch}>
            {
              rematch === REMATCH_STATE.SELF ? "Waiting For Opponent to Accept" :
              rematch === REMATCH_STATE.OPPONENT ? "Opponent wants Rematch" : 
              rematch === REMATCH_STATE.BOTH ? "Starting Rematch" : "Request Rematch with Opponent"
            }
          </button>
          : null }
    </div>
  );
}

export default OnlineBoard;
