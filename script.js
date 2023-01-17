const Player = (sign) => {
  this.sign = sign;

  const getPlayerSign = () => sign;

  return { getPlayerSign };
};

const gameBoard = (() => {
  const gameBoardArray = ["", "", "", "", "", "", "", "", ""];

  const updateBoardField = (sign, index) => {
    gameBoardArray[index] = sign;
  };

  const clearGameBoardArray = () => {
    gameBoardArray.forEach((field, index) => {
      gameBoardArray[index] = "";
    });
  };

  return { gameBoardArray, updateBoardField, clearGameBoardArray };
})();

const displayController = (() => {
  const updateRoundMessage = () => {
    const message = document.getElementById("message");
    message.textContent = `Player ${gameController.getCurrentPlayer()}'s turn`;
  };

  const renderBoard = () => {
    displayController.updateRoundMessage();

    let gameBoardHtml = "";

    gameBoard.gameBoardArray.forEach((field, index) => {
      gameBoardHtml += `<div class="field" data-field="${index}">${field}</div>`;
    });
    document.getElementById("gameBoard").innerHTML = gameBoardHtml;
  };

  return {
    updateRoundMessage, renderBoard
  };
})();

const gameController = (() => {
  const playerX = Player("X");
  const playerO = Player("O");
  let round = 1;

  document.addEventListener("click", (e) => {
    if (e.target.dataset.field) makeMove(e.target.dataset.field);

    if (e.target.id === "restartBtn") restartGame();
  });

  const getCurrentPlayer = () => {
    if (round % 2 === 1) return playerX.getPlayerSign();
    return playerO.getPlayerSign();
  };

  const makeMove = (index) => {
    console.log(round)
    if (gameBoard.gameBoardArray[index] !== "") return;

    gameBoard.updateBoardField(getCurrentPlayer(), index);
    updateRound()
    displayController.renderBoard();
  };

  const updateRound = () => {
    if (round === 9) return;

    round += 1;
  };

  const restartGame = () => {
    round = 1;
    displayController.updateRoundMessage();
    gameBoard.clearGameBoardArray();
    displayController.renderBoard()
  };

  return { getCurrentPlayer, updateRound};
})();

displayController.renderBoard();
