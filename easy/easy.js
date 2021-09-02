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
const buttonEasy = document.getElementById("button1");

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 4, 6],
  [0, 4, 8],
  [2, 4, 6],
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

// buttonEasy.addEventListener("click", () => {
//   console.log('here')
//   const personXname = document.getElementById("#personX");
//   const personOname = document.getElementById("#personO");
//   personX = personXname.value;
//   personO = personOname.value;
// });

// console.log(personO);

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
