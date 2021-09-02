// We are making variables from the and storing from the html and css
let personXName;
let personOName;
const personX = document.getElementById("personX");
const personO = document.getElementById("personO");
personX.addEventListener("change", () => {
  personXName = personX.value;
});
personO.addEventListener("change", () => {
  personOName = personO.value;
});
const xClass = "x";
const oClass = "circle";
const restartButton = document.getElementById("restartButton");

const winningCombinations = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8],
  [9, 10, 11, 12, 13, 14, 15, 16, 17],
  [18, 19, 20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, 31, 32, 33, 34, 35],
  [36, 37, 38, 39, 40, 41, 42, 43, 44],
  [45, 46, 47, 48, 49, 50, 51, 52, 53],
  [54, 55, 56, 57, 58, 59, 60, 61, 62],
  [63, 64, 65, 66, 67, 68, 69, 70, 71],
  [72, 73, 74, 75, 76, 77, 78, 79, 80],
  [0, 9, 18, 27, 36, 45, 54, 63, 72],
  [1, 10, 19, 28, 37, 46, 55, 64, 73],
  [2, 11, 20, 29, 38, 47, 56, 65, 74],
  [3, 12, 21, 30, 39, 48, 57, 66, 75],
  [4, 13, 22, 31, 40, 49, 58, 67, 76],
  [5, 14, 23, 32, 41, 50, 59, 68, 77],
  [6, 15, 24, 33, 42, 51, 60, 69, 78],
  [7, 16, 25, 34, 43, 52, 61, 70, 79],
  [8, 17, 26, 35, 44, 53, 62, 71, 80],
  [0, 10, 20, 30, 40, 50, 60, 70, 80],
  [8, 16, 24, 32, 40, 48, 56, 64, 72],
];

const board = document.querySelector("#board");
const cells = document.querySelectorAll(".cell");
const winningMessageElement = document.getElementById("winningMessage");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);

// We are making the turn the desicion bewtween x or o {once: true}
// we need a plural and singular cell and make a xTurn var or let addEventlistener

let xTurn;
startGame();
restartButton.addEventListener("click", startGame);

cells.forEach((cell) => {
  cell.addEventListener("click", handleclick, { once: true });
});

//When we click it will put a circle or x
//? : is when ? is true and : is false
//e is an event and e is also e.target
//and put them in vairables

function handleclick(e) {
  const cell = e.target;
  const currentClass = xTurn ? xClass : oClass;
  placeMark(cell, currentClass);
  //this means that it will check if the current class is still in there but if not dont endgame else if if it is a draw endgame true else kep playing
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurn();
    setHoverBoardClass();
  }
}

//Endgame makes it if it is draw it will call draw if not but a winning combination activated it will x or o win then get the element and show it ''
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw";
  } else {
    winningMessageTextElement.innerText = xTurn
      ? personXName === undefined || null
        ? "X Wins"
        : `${personXName} Wins`
      : personOName === undefined || null
      ? "O wins"
      : `${personOName} Wins`;
  }
  winningMessageElement.classList.add("show");
}
//This is chack if it is going to be a draw all cells are full or not meaning it is chacking for the endgame function
function isDraw() {
  return [...cells].every((cell) => {
    return cell.classList.contains(xClass) || cell.classList.contains(oClass);
  });
}

//This is gonna be a way for x to start first because xTurn will always be true and the click and cell is to put out the x

function startGame() {
  xTurn = true;
  cells.forEach((cell) => {
    cell.classList.remove(xClass);
    cell.classList.remove(oClass);
    cell.removeEventListener("click", handleclick);
    cell.addEventListener("click", handleclick, { once: true });
  });
  winningMessageElement.classList.remove("show");
  setHoverBoardClass();
}

//We will add when click bc the cell variable is e.target meaning it will mouseClick and currentClass is gonna decide if x or o
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

//First it is going to show true above becuase it is let, then it is going to  go down to this function and since it is true it will switch to false going back up it will go this function skipping variable, it will go to true because it is false transforming to true
function swapTurn() {
  xTurn = !xTurn;
}
//THis function is going to remove both x and o and if the xTurn is going to add xClass or else circleClass

function setHoverBoardClass() {
  board.classList.remove(xClass);
  board.classList.remove(oClass);

  if (xTurn) {
    board.classList.add(xClass);
  } else {
    board.classList.add(oClass);
  }
}

//So we are making a function that makes a check win meaning we will pull out one of the combinations and .some will make sure one of them will win or be chosen but inside it will constantly keep checking the indexs or numbers to see if any will be a combinations and it will return whcik cell contains the x or o bc classlist is the lists making it one of the x or o contains the x or o

function checkWin(currentClass) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
}
