// Tic Tac Toe Game - Single File Implementation
document.addEventListener("DOMContentLoaded", () => {
  // Gameboard Module
  const Gameboard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => [...board];

    const markCell = (index, marker) => {
      if (index >= 0 && index < board.length && board[index] === "") {
        board[index] = marker;
        return true;
      }
      return false;
    };

    const resetBoard = () => {
      for (let i = 0; i < board.length; i++) {
        board[i] = "";
      }
    };

    const isBoardFull = () => {
      return board.every((cell) => cell !== "");
    };

    return {
      getBoard,
      markCell,
      resetBoard,
      isBoardFull,
    };
  })();

  // Player Factory
  const createPlayer = (name, marker) => {
    return { name, marker };
  };

  // Display Controller
  const DisplayController = (() => {
    const cells = [];
    const statusDisplay = document.getElementById("status");
    const restartButton = document.getElementById("restart");
    const gameboardElement = document.getElementById("gameboard");

    const initializeBoard = () => {
      gameboardElement.innerHTML = "";
      cells.length = 0;

      for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        gameboardElement.appendChild(cell);
        cells.push(cell);
      }
    };

    const updateCell = (index, marker) => {
      cells[index].textContent = marker;
    };

    const setStatus = (message) => {
      statusDisplay.textContent = message;
    };

    const addCellClickHandler = (callback) => {
      cells.forEach((cell) => {
        cell.addEventListener("click", () =>
          callback(parseInt(cell.dataset.index))
        );
      });
    };

    const addRestartClickHandler = (callback) => {
      restartButton.addEventListener("click", callback);
    };

    return {
      initializeBoard,
      updateCell,
      setStatus,
      addCellClickHandler,
      addRestartClickHandler,
    };
  })();

  // Game Controller
  const GameController = (() => {
    let currentPlayer;
    let gameActive;
    let player1, player2;

    const startGame = () => {
      player1 = createPlayer("Player 1", "X");
      player2 = createPlayer("Player 2", "O");
      currentPlayer = player1;
      gameActive = true;

      Gameboard.resetBoard();
      DisplayController.initializeBoard();
      DisplayController.setStatus(
        `${currentPlayer.name}'s turn (${currentPlayer.marker})`
      );

      DisplayController.addCellClickHandler(handleCellClick);
      DisplayController.addRestartClickHandler(resetGame);
    };

    const handleCellClick = (index) => {
      if (!gameActive) return;

      if (Gameboard.markCell(index, currentPlayer.marker)) {
        DisplayController.updateCell(index, currentPlayer.marker);

        if (checkWin()) {
          DisplayController.setStatus(`${currentPlayer.name} wins!`);
          gameActive = false;
          return;
        }

        if (Gameboard.isBoardFull()) {
          DisplayController.setStatus("Game ended in a draw!");
          gameActive = false;
          return;
        }

        switchPlayer();
      }
    };

    const switchPlayer = () => {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      DisplayController.setStatus(
        `${currentPlayer.name}'s turn (${currentPlayer.marker})`
      );
    };

    const checkWin = () => {
      const board = Gameboard.getBoard();
      const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // rows
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // columns
        [0, 4, 8],
        [2, 4, 6], // diagonals
      ];

      return winPatterns.some((pattern) => {
        const [a, b, c] = pattern;
        return (
          board[a] !== "" && board[a] === board[b] && board[a] === board[c]
        );
      });
    };

    const resetGame = () => {
      startGame();
    };

    return {
      startGame,
    };
  })();

  // Start the game
  GameController.startGame();
});

// Structure:

// html
// css
// js
//     gameboard
// board
// -----retrieve board
// -----mark cell
// -----reset board
// -----return object

//     player
//         player1
//         player2
//     game flow
//     display
