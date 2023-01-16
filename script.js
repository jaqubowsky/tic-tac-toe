const Player = (sign) => {
  this.sign = sign;

  const getPlayerSign = () => sign;

  return { getPlayerSign };
};

const gameBoard = (() => {
  const gameBoardArray = ["", "", "", "", "", "", "", "", ""];

  const renderBoard = () => {
    let gameBoardHtml = "";

    gameBoardArray.forEach((field, index) => {
      gameBoardHtml += `<div class="field" data-field="${index}">${field}</div>`;
    });
    document.getElementById("gameBoard").innerHTML = gameBoardHtml;

    displayController.updateMessage();
  };

  const clearBoard = () => {
    gameBoardArray.forEach((field, index) => {
      gameBoardArray[index] = "";
    });
    renderBoard();
  };

  const updateBoard = (sign, index) => {
    if (gameBoardArray[index] !== "") return;
    displayController.updateRound();
    gameBoardArray[index] = sign;
    renderBoard();
  };

  return { renderBoard, clearBoard, updateBoard };
})();

const displayController = (() => {
  const playerO = Player("O");
  const playerX = Player("X");
  let round = 1;

  document.addEventListener("click", (e) => {
    if (!e.target.dataset.field) return;
    makeMove(e.target.dataset.field);
  });

  const makeMove = (index) => {
    gameBoard.updateBoard(getCurrentPlayer(), index);
    updateMessage();
  };

  const updateMessage = () => {
    const message = document.getElementById("message");
    message.textContent = `Player ${getCurrentPlayer()}'s turn`;
  };

  const getCurrentPlayer = () => {
    if (round % 2 === 1) return playerX.getPlayerSign();
    return playerO.getPlayerSign();
  };

  const updateRound = () => {
    if (round === 9) return;

    round += 1;
  };

  const restartGame = () => {
    document.getElementById("restartBtn").addEventListener("click", () => {
      round = 1;
      gameBoard.clearBoard();
    });
  };

  return {
    makeMove,
    restartGame,
    getCurrentPlayer,
    updateRound,
    updateMessage,
  };
})();

gameBoard.renderBoard();
displayController.restartGame();
