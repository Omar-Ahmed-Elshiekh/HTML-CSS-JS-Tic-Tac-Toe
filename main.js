const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("statusText");
// const restartbtn = document.getElementById("restartbtn");
const playerX = document.querySelector(".x");
const playerO = document.querySelector(".o");
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOn = false;
let xScore = 0;
let oScore = 0;
beginGame();

function beginGame() {
  updateScores();
  cells.forEach((cell) => cell.addEventListener("click", checkCell));
  statusText.textContent = `${currentPlayer}'s turn`;
  gameOn = true;
}

function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}

function checkCell() {
  const cellIndex = this.getAttribute("cellIndex");
  if (options[cellIndex] != "" || !gameOn) {
    return;
  }

  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }

    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    if (currentPlayer === "X") {
      xScore++;
    } else {
      oScore++;
    }
    updateScores();
    statusText.textContent = `${currentPlayer} wins!`;
    gameOn = false;
  } else if (!options.includes("")) {
    statusText.textContent = `Draw!`;
    gameOn = false;
  } else {
    changePlayer();
  }
}

function updateScores() {
  playerX.textContent = `X: ${xScore}`;
  playerO.textContent = `O: ${oScore}`;
}
function restart() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ""));
  gameOn = true;
}

function reset() {
  xScore = 0;
  oScore = 0;
  updateScores();
  restart();
}


