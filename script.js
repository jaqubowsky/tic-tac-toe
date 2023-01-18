const Player = (sign) => {
  this.sign = sign;

  const getPlayerSign = () => sign;

  return { getPlayerSign };
};

const gameBoard = (() => {
  const gameBoardArray = ["", "", "", "", "", "", "", "", ""];

  const getBoardField = (index) => gameBoardArray[index];

  const updateBoardField = (sign, index) => {
    gameBoardArray[index] = sign;
  };

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

  return { updateBoardField, clearGameBoardArray, getBoardField, renderBoard };
})();

const displayController = (() => {
  const messageElement = document.getElementById("message");

  document.addEventListener("click", (e) => {
    if (e.target.dataset.field) {
      if (e.target.textContent !== "" || gameController.getIsOver()) return;

      gameController.playGame(e.target.dataset.field);
      displayController.updateBoard();
    }

    if (e.target.id === "restartBtn") gameController.restartGame();
  });

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
    document.querySelectorAll(".field").forEach((field, index) => {
      field.textContent = gameBoard.getBoardField(index);
    });
  };

  return { updateWinMessage, updateBoard, updateRoundMessage };
})();

const gameController = (() => {
  const playerX = Player("X");
  const playerO = Player("O");
  let round = 1;
  let isOver = false;

  const getCurrentPlayerSign = () =>
    round % 2 === 1 ? playerX.getPlayerSign() : playerO.getPlayerSign();

  const playGame = (index) => {
    gameBoard.updateBoardField(gameController.getCurrentPlayerSign(), index);

    if (checkWinner()) {
      isOver = true;
      displayController.updateWinMessage(getCurrentPlayerSign());
      return;
    }

    if (round === 9) {
      isOver = true;
      displayController.updateWinMessage("Draw");
      return;
    }

    round += 1;
    displayController.updateRoundMessage(getCurrentPlayerSign());
  };

  const checkWinner = () => {
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

    return possibleWinCombinations.some((combinations) =>
      combinations.every(
        (val) => gameBoard.getBoardField(val) === getCurrentPlayerSign()
      )
    );
  };

  const getIsOver = () => isOver;

  const restartGame = () => {
    round = 1;
    isOver = false;
    gameBoard.clearGameBoardArray();
    displayController.updateRoundMessage(getCurrentPlayerSign());
    displayController.updateBoard();
  };

  return {
    getCurrentPlayerSign,
    checkWinner,
    getIsOver,
    playGame,
    restartGame,
  };
})();

gameBoard.renderBoard();
