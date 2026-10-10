import {useState} from 'react';

// Square will change value on a click
function Square({value, onSquareClick}) {
  return (
    <button 
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  ) 
}

// End game, reset board to null state
function ResetGameButton({onReset}) {
  return <button onClick={onReset}>Reset Game</button>;
}

// Board handles actual gameplay
export default function Board() {
  // Player turn
  const [xIsNext, setXIsNext] = useState(true);
  // Grid squares
  const [squares, setSquares] = useState(Array(9).fill(null));

  // Player Names
  const [xPlayerName, setXPlayerName] = useState("");
  const [oPlayerName, setOPlayerName] = useState("");

  // Show game history
  const [games, setGames] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  
  // Clear board and save results
  async function handleReset() {
    // Check game is over
    if (winner || isDraw) {
      const result = winner ? winner : "Draw";

      try {
        const response = await fetch("http://localhost:8080/api/games", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            xPlayerName: xPlayerName,
            oPlayerName: oPlayerName,
            result: result,
          }),
        });

        // Error catch
        if (!response.ok) {
          throw new Error("Could not save game");
        }
      } catch (error) {
        console.error(error);
      }
    }

    // Reset to default for next game
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setXPlayerName("");
    setOPlayerName("");
  }

    // Show game history on button click
  async function handleHistoryClick() {
    if (showHistory) {
      setShowHistory(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/games");

      if (!response.ok) {
        throw new Error("Could not load game history");
      }

      const savedGames = await response.json();
      setGames(savedGames);
      setShowHistory(true);
    } catch (error) {
      console.error(error);
    }
  }

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((square) => square !== null);

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (isDraw) {
    status = "Draw";
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
  
  return (
    <>
      <div>
        <h1>Tic Tac Toe</h1>
        <label>
          X Player: 
          <input
            type="text"
            value={xPlayerName}
            onChange={(event) => setXPlayerName(event.target.value)}
            placeholder="Enter player name"
          />
        </label>

        <label>
          O Player: 
          <input
            type="text"
            value={oPlayerName}
            onChange={(event) => setOPlayerName(event.target.value)}
            placeholder="Enter player name"
          />
        </label>
      </div>

      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>

      <div className="game-buttons">
        <ResetGameButton onReset={handleReset} />

        <button onClick={handleHistoryClick}>
          {showHistory ? "Hide Game History" : "View Game History"}
        </button>
      </div>

      {showHistory && (
        <div className="game-history">
          <h3>Game History</h3>

          {games.length === 0 ? (
            <p>No completed games saved yet.</p>
          ) : (
            <ul>
              {games.map((game) => (
                <li key={game.id}>
                  {game.xPlayerName} (X) vs. {game.oPlayerName} (O) —
                  {" "}
                  {game.result === "Draw"
                    ? "Draw"
                    : `Winner: ${game.result}`}
                  {" — "}
                  {new Date(game.playedAt).toLocaleString()}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
