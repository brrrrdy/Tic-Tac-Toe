document.addEventListener("DOMContentLoaded", () => {
  // GAMEBOARD
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

  // PLAYERS

  // DISPLAY

  // GAMEFLOW
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
