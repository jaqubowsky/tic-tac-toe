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

  const getBoardField = (index) => gameBoardArray[index];

  const clearGameBoardArray = () => {
    for (let i = 0; i < gameBoardArray.length; i += 1) {
      gameBoardArray[i] = "";
    }
  };

  const renderBoard = () => {
    displayController.updateRoundMessage(gameController.getCurrentPlayerSign());

    let gameBoardHtml = "";

    gameBoardArray.forEach((field, index) => {
      gameBoardHtml += `<div class="field" data-field="${index}">${field}</div>`;
    });

    document.getElementById("gameBoard").innerHTML = gameBoardHtml;
  };

  return {
    updateBoardField,
    clearGameBoardArray,
    getBoardField,
    renderBoard,
  };
})();

const displayController = (() => {
  const messageElement = document.getElementById("message");

  const updateWinMessage = (winner) => {
    if (winner === "Draw") {
      messageElement.textContent = "It's a draw!";
    } else {
      messageElement.textContent = `Player ${winner}'s win!`;
    }
  };

  const updateRoundMessage = (sign) => {
    messageElement.textContent = `Player ${sign}'s turn!`;
  };

  const updateBoard = () => {
    const gameBoardField = document.querySelectorAll(".field");

    gameBoardField.forEach((field, index) => {
      field.textContent = gameBoard.getBoardField(index);
    });
  };

  return { updateWinMessage, updateBoard, updateRoundMessage };
})();

const gameController = (() => {
  const playerX = Player("X");
  const playerO = Player("O");
  let round = 0;
  let isOver = false;

  document.addEventListener("click", (e) => {
    if (e.target.dataset.field) makeMove(e.target.dataset.field);

    if (e.target.id === "restartBtn") restartGame();
  });

  const getCurrentPlayerSign = () =>
    round % 2 === 0 ? playerX.getPlayerSign() : playerO.getPlayerSign();

  const makeMove = (index) => {
    if (gameBoard.getBoardField(index) !== "" || isOver) return;
    gameBoard.updateBoardField(getCurrentPlayerSign(), index);
    displayController.updateBoard();

    if (checkWin()) {
      isOver = true;
      displayController.updateWinMessage(getCurrentPlayerSign());
      return;
    }

    round += 1;
    displayController.updateRoundMessage(getCurrentPlayerSign());

    if (round === 9) {
      isOver = true;
      displayController.updateWinMessage("Draw");
    }
  };

  const restartGame = () => {
    round = 0;
    isOver = false;
    gameBoard.clearGameBoardArray();
    displayController.updateRoundMessage(getCurrentPlayerSign());
    displayController.updateBoard();
  };

  const possibleWinCombinations = [
    [0, 1, 2],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWin = () =>
    possibleWinCombinations.some((combinations) =>
      combinations.every(
        (val) => gameBoard.getBoardField(val) === getCurrentPlayerSign()
      )
    );

  return { getCurrentPlayerSign, checkWin };
})();

gameBoard.renderBoard();
