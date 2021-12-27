// imports

//global variables
let numberOfPlayers = 2;
let numberOfCards = 2;
let domGrid;
let PlayerOne;
let PlayerTwo;
let PlayerThree = undefined;
let PlayerFour = undefined;
let turn = 0;
let elementsWithEventListeners = [];

// Getting dom elements
const numberOfPlayersSelect = document.getElementById("Nplayers");
const numberOfCardsSelect = document.getElementById("Ncards");
const start = document.querySelector("form");
const login = document.getElementById("login");
const game = document.getElementById("game");
let tiles = document.querySelectorAll("td");
const cardsOne = document.getElementById("oneCards");
const cardsTwo = document.getElementById("twoCards");
const cardsThree = document.getElementById("threeCards");
const cardsFour = document.getElementById("fourCards");
const turnNumber = document.getElementById("turns");
const restart = document.getElementById("buttonn");
const instructions = document.getElementById("instructions");
const txt = document.getElementById("txt");

// objects
// for reference (no actual use in code )
let Tile = {
  src: "",
  type: "",
  movable: true,
  rotatble: false,
  angle: 0,
  xY: {},
  treasure: "none",
  occupied: false,
  accesibleSides: {},
};

//event listeners
instructions.addEventListener("click", (e) => {
  e.preventDefault();
  txt.style.display = "block";
});
restart.addEventListener("click", (e) => {
  location.reload();
  /*preventDefault();
  Player1 = {
    ...Player1,
    x: 86,
    y: 86,

    currenGoal: 0,
  };
  Player2 = {
    ...Player2,
    x: 86,
    y: 602,

    currenGoal: 0,
  };

  Player3 = {
    ...Player3,
    x: 602,
    y: 86,

    currenGoal: 0,
  };
  Player4 = {
    Player4,
    x: 602,
    y: 602,

    currenGoal: 0,
  };

  updatePlayers();
  drawGoals(Player1);
  drawGoals(Player2);
  drawGoals(Player3);
  drawGoals(Player4);*/
});
numberOfPlayersSelect.addEventListener("change", () => {
  numberOfPlayers = parseInt(numberOfPlayersSelect.value);
  numberOfCardsSelect.innerHTML = "";
  let maxCards = 24 / numberOfPlayers;

  for (let i = 1; i <= maxCards; i++) {
    if (i == 2) {
      numberOfCardsSelect.innerHTML += "<option selected>2</option>";
    } else {
      numberOfCardsSelect.innerHTML += `<option>${i}</option>`;
    }
  }
});
numberOfCardsSelect.addEventListener("change", () => {
  numberOfCards = parseInt(numberOfCardsSelect.value);
});
window.addEventListener(
  "contextmenu",
  (e) => {
    e.preventDefault();
  },
  false
);
start.addEventListener("submit", (e) => {
  e.preventDefault();

  drawPlayers();
  for (let index = 0; index < numberOfCards; index++) {
    Player1.goals +=
      presentTreasures[Math.floor(Math.random() * presentTreasures.length)];
    Player2.goals.push(
      presentTreasures[Math.floor(Math.random() * presentTreasures.length)]
    );
    if (numberOfPlayers >= 3)
      Player3.goals.push(
        presentTreasures[Math.floor(Math.random() * presentTreasures.length)]
      );
    if (numberOfPlayers == 4)
      Player4.goals.push(
        presentTreasures[Math.floor(Math.random() * presentTreasures.length)]
      );
  }
  drawGoals(Player1);
  drawGoals(Player2);
  drawGoals(Player3);
  drawGoals(Player4);
  login.style.display = "none";
  game.style.display = "block";
});
extraCard.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  let tmpObj;
  let tmpSrc = extraCard.src.split("/")[4];
  let type = getType(tmpSrc);
  let angle = getAngle(tmpSrc);
  let treasure = getTreasure(tmpSrc);

  switch (type) {
    case "T":
      tmpObj = images.T;
      break;
    case "U":
      tmpObj = images.U;
      break;
    case "S":
      tmpObj = images.S;
      break;
  }
  switch (treasure) {
    case "G":
      tmpObj = tmpObj.ghost;
      break;
    case "J":
      tmpObj = tmpObj.jewel;
      break;
    default:
      tmpObj = tmpObj.blank;
  }

  angle = (angle + 90) % 360;
  extraCard.src = "./src/" + tmpObj[angle];
});

//game logic
const handleClick = (pos) => {
  let p1 = getPlayerPosition(Player1);
  let p2 = getPlayerPosition(Player2);
  let p3 = getPlayerPosition(Player3);
  let p4 = getPlayerPosition(Player4);

  let gameGrid = getGrid(tiles);
  let row, col;
  switch (pos) {
    case "D1":
      if (p1.x == 1) setPlayerPosition(Player1, p1.x, p1.y + 1);
      if (p2.x == 1) setPlayerPosition(Player2, p2.x, p2.y + 1);
      if (p3.x == 1) setPlayerPosition(Player3, p3.x, p3.y + 1);
      if (p4.x == 1) setPlayerPosition(Player4, p4.x, p4.y + 1);

      col = 1;
      domGrid[0][col].children[0].src = extraCard.src;
      extraCard.src = `./src/${gameGrid[6][col].src} `;
      for (row = 1; row < 7; row++) {
        domGrid[row][col].children[0].src = `./src/${
          gameGrid[row - 1][col].src
        } `;
      }
      break;

    case "D2":
      if (p1.x == 3) setPlayerPosition(Player1, p1.x, p1.y + 1);
      if (p2.x == 3) setPlayerPosition(Player2, p2.x, p2.y + 1);
      if (p3.x == 3) setPlayerPosition(Player3, p3.x, p3.y + 1);
      if (p4.x == 3) setPlayerPosition(Player4, p4.x, p4.y + 1);
      col = 3;
      domGrid[0][col].children[0].src = extraCard.src;
      extraCard.src = `./src/${gameGrid[6][col].src} `;
      for (row = 1; row < 7; row++) {
        domGrid[row][col].children[0].src = `./src/${
          gameGrid[row - 1][col].src
        } `;
      }
      break;
    case "D3":
      col = 5;
      if (p1.x == col) setPlayerPosition(Player1, p1.x, p1.y + 1);
      if (p2.x == col) setPlayerPosition(Player2, p2.x, p2.y + 1);
      if (p3.x == col) setPlayerPosition(Player3, p3.x, p3.y + 1);
      if (p4.x == col) setPlayerPosition(Player4, p4.x, p4.y + 1);
      domGrid[0][col].children[0].src = extraCard.src;
      extraCard.src = `./src/${gameGrid[6][col].src} `;
      for (row = 1; row < 7; row++) {
        domGrid[row][col].children[0].src = `./src/${
          gameGrid[row - 1][col].src
        } `;
      }
      break;
    case "R1":
      row = 1;
      if (p1.y == row) setPlayerPosition(Player1, p1.x + 1, p1.y);
      if (p2.y == row) setPlayerPosition(Player2, p2.x + 1, p2.y);
      if (p3.y == row) setPlayerPosition(Player3, p3.x + 1, p3.y);
      if (p4.y == row) setPlayerPosition(Player4, p4.x + 1, p4.y);
      domGrid[row][0].children[0].src = extraCard.src;
      extraCard.src = `./src/${gameGrid[row][6].src} `;
      for (col = 1; col < 7; col++) {
        domGrid[row][col].children[0].src = `./src/${
          gameGrid[row][col - 1].src
        } `;
      }
      break;
    case "R2":
      row = 3;
      if (p1.y == row) setPlayerPosition(Player1, p1.x + 1, p1.y);
      if (p2.y == row) setPlayerPosition(Player2, p2.x + 1, p2.y);
      if (p3.y == row) setPlayerPosition(Player3, p3.x + 1, p3.y);
      if (p4.y == row) setPlayerPosition(Player4, p4.x + 1, p4.y);
      domGrid[row][0].children[0].src = extraCard.src;
      extraCard.src = `./src/${gameGrid[row][6].src} `;
      for (col = 1; col < 7; col++) {
        domGrid[row][col].children[0].src = `./src/${
          gameGrid[row][col - 1].src
        } `;
      }
      break;
    case "R3":
      row = 5;
      if (p1.y == row) setPlayerPosition(Player1, p1.x + 1, p1.y);
      if (p2.y == row) setPlayerPosition(Player2, p2.x + 1, p2.y);
      if (p3.y == row) setPlayerPosition(Player3, p3.x + 1, p3.y);
      if (p4.y == row) setPlayerPosition(Player4, p4.x + 1, p4.y);
      domGrid[row][0].children[0].src = extraCard.src;
      extraCard.src = `./src/${gameGrid[row][6].src} `;
      for (col = 1; col < 7; col++) {
        domGrid[row][col].children[0].src = `./src/${
          gameGrid[row][col - 1].src
        } `;
      }
      break;
    case "U1":
      col = 1;
      if (p1.x == col) setPlayerPosition(Player1, p1.x, p1.y - 1);
      if (p2.x == col) setPlayerPosition(Player2, p2.x, p2.y - 1);
      if (p3.x == col) setPlayerPosition(Player3, p3.x, p3.y - 1);
      if (p4.x == col) setPlayerPosition(Player4, p4.x, p4.y - 1);
      domGrid[6][col].children[0].src = extraCard.src;
      extraCard.src = `./src/${gameGrid[0][col].src} `;
      for (row = 5; row >= 0; row--) {
        domGrid[row][col].children[0].src = `./src/${
          gameGrid[row + 1][col].src
        } `;
      }

      break;
    case "U2":
      col = 3;
      if (p1.x == col) setPlayerPosition(Player1, p1.x, p1.y - 1);
      if (p2.x == col) setPlayerPosition(Player2, p2.x, p2.y - 1);
      if (p3.x == col) setPlayerPosition(Player3, p3.x, p3.y - 1);
      if (p4.x == col) setPlayerPosition(Player4, p4.x, p4.y - 1);
      domGrid[6][col].children[0].src = extraCard.src;
      extraCard.src = `./src/${gameGrid[0][col].src} `;
      for (row = 5; row >= 0; row--) {
        domGrid[row][col].children[0].src = `./src/${
          gameGrid[row + 1][col].src
        } `;
      }
      break;
    case "U3":
      col = 5;
      if (p1.x == col) setPlayerPosition(Player1, p1.x, p1.y - 1);
      if (p2.x == col) setPlayerPosition(Player2, p2.x, p2.y - 1);
      if (p3.x == col) setPlayerPosition(Player3, p3.x, p3.y - 1);
      if (p4.x == col) setPlayerPosition(Player4, p4.x, p4.y - 1);
      domGrid[6][col].children[0].src = extraCard.src;
      extraCard.src = `./src/${gameGrid[0][col].src} `;
      for (row = 5; row >= 0; row--) {
        domGrid[row][col].children[0].src = `./src/${
          gameGrid[row + 1][col].src
        } `;
      }

      break;
    case "L1":
      row = 1;
      if (p1.y == row) setPlayerPosition(Player1, p1.x - 1, p1.y);
      if (p2.y == row) setPlayerPosition(Player2, p2.x - 1, p2.y);
      if (p3.y == row) setPlayerPosition(Player3, p3.x - 1, p3.y);
      if (p4.y == row) setPlayerPosition(Player4, p4.x - 1, p4.y);
      domGrid[row][6].children[0].src = extraCard.src;
      extraCard.src = `./src/${gameGrid[row][0].src} `;
      for (col = 5; col >= 0; col--) {
        domGrid[row][col].children[0].src = `./src/${
          gameGrid[row][col + 1].src
        } `;
      }

      break;
    case "L2":
      row = 3;
      if (p1.y == row) setPlayerPosition(Player1, p1.x - 1, p1.y);
      if (p2.y == row) setPlayerPosition(Player2, p2.x - 1, p2.y);
      if (p3.y == row) setPlayerPosition(Player3, p3.x - 1, p3.y);
      if (p4.y == row) setPlayerPosition(Player4, p4.x - 1, p4.y);
      domGrid[row][6].children[0].src = extraCard.src;
      extraCard.src = `./src/${gameGrid[row][0].src} `;
      for (col = 5; col >= 0; col--) {
        domGrid[row][col].children[0].src = `./src/${
          gameGrid[row][col + 1].src
        } `;
      }

      break;
    case "L3":
      row = 5;
      if (p1.y == row) setPlayerPosition(Player1, p1.x - 1, p1.y);
      if (p2.y == row) setPlayerPosition(Player2, p2.x - 1, p2.y);
      if (p3.y == row) setPlayerPosition(Player3, p3.x - 1, p3.y);
      if (p4.y == row) setPlayerPosition(Player4, p4.x - 1, p4.y);
      domGrid[row][6].children[0].src = extraCard.src;
      extraCard.src = `./src/${gameGrid[row][0].src} `;
      for (col = 5; col >= 0; col--) {
        domGrid[row][col].children[0].src = `./src/${
          gameGrid[row][col + 1].src
        } `;
      }

      break;
    default:
      break;
  }
  updatePlayers();
};

const possibleMoves = (player) => {
  let playerPos = getPlayerPosition(player);
  let grid = getGrid(tiles);
  let currentCell = grid[playerPos.y][playerPos.x];
  if (
    playerPos.x > 0 &&
    playerPos.x < 6 &&
    playerPos.y > 0 &&
    playerPos.y < 6
  ) {
    return {
      right:
        currentCell.accesibleSides.right &&
        grid[playerPos.y][playerPos.x + 1].accesibleSides.left,
      left:
        currentCell.accesibleSides.left &&
        grid[playerPos.y][playerPos.x - 1].accesibleSides.right,
      top:
        currentCell.accesibleSides.top &&
        grid[playerPos.y - 1][playerPos.x].accesibleSides.bottom,
      bottom:
        currentCell.accesibleSides.bottom &&
        grid[playerPos.y + 1][playerPos.x].accesibleSides.top,
    };
  } else if (playerPos.x == 0) {
    return {
      right:
        currentCell.accesibleSides.right &&
        grid[playerPos.y][playerPos.x + 1].accesibleSides.left,
      left: false,
      top:
        currentCell.accesibleSides.top &&
        grid[playerPos.y - 1][playerPos.x].accesibleSides.bottom,
      bottom:
        currentCell.accesibleSides.bottom &&
        grid[playerPos.y + 1][playerPos.x].accesibleSides.top,
    };
  } else if (playerPos.x === 6) {
    return {
      right: false,
      left:
        currentCell.accesibleSides.left &&
        grid[playerPos.y][playerPos.x - 1].accesibleSides.right,
      top:
        currentCell.accesibleSides.top &&
        grid[playerPos.y - 1][playerPos.x].accesibleSides.bottom,
      bottom:
        currentCell.accesibleSides.bottom &&
        grid[playerPos.y + 1][playerPos.x].accesibleSides.top,
    };
  } else if (playerPos.y === 0) {
    return {
      right:
        currentCell.accesibleSides.right &&
        grid[playerPos.y][playerPos.x + 1].accesibleSides.left,
      left:
        currentCell.accesibleSides.left &&
        grid[playerPos.y][playerPos.x - 1].accesibleSides.right,
      top: false,
      bottom:
        currentCell.accesibleSides.bottom &&
        grid[playerPos.y + 1][playerPos.x].accesibleSides.top,
    };
  } else if (playerPos.y === 6) {
    return {
      right:
        currentCell.accesibleSides.right &&
        grid[playerPos.y][playerPos.x + 1].accesibleSides.left,
      left:
        currentCell.accesibleSides.left &&
        grid[playerPos.y][playerPos.x - 1].accesibleSides.right,
      top:
        currentCell.accesibleSides.top &&
        grid[playerPos.y - 1][playerPos.x].accesibleSides.bottom,
      bottom: false,
    };
  }
};
const movePlayer = (player) => {
  elementsWithEventListeners = [];
  if (turn === player.turn) {
    let playerPos = getPlayerPosition(player);
    let moves = possibleMoves(player);

    if (moves.right) {
      domGrid[playerPos.y][playerPos.x + 1].style.border = " 1px solid red ";
      domGrid[playerPos.y][playerPos.x + 1].addEventListener("click", (e) => {
        handleMovement(player, playerPos.y, playerPos.x + 1);
      });
      elementsWithEventListeners.push(domGrid[playerPos.y][playerPos.x + 1]);
    }
    if (moves.left) {
      domGrid[playerPos.y][playerPos.x - 1].style.border = " 1px solid red ";
      domGrid[playerPos.y][playerPos.x - 1].addEventListener("click", (e) => {
        handleMovement(player, playerPos.y, playerPos.x - 1);
      });
      elementsWithEventListeners.push(domGrid[playerPos.y][playerPos.x - 1]);
    }
    if (moves.top) {
      domGrid[playerPos.y - 1][playerPos.x].style.border = " 1px solid red ";
      domGrid[playerPos.y - 1][playerPos.x].addEventListener("click", (e) => {
        handleMovement(player, playerPos.y - 1, playerPos.x);
      });
      elementsWithEventListeners.push(domGrid[playerPos.y - 1][playerPos.x]);
    }
    if (moves.bottom) {
      domGrid[playerPos.y + 1][playerPos.x].style.border = " 1px solid red ";
      domGrid[playerPos.y + 1][playerPos.x].addEventListener("click", (e) => {
        handleMovement(player, playerPos.y + 1, playerPos.x);
      });
      elementsWithEventListeners.push(domGrid[playerPos.y + 1][playerPos.x]);
    }
    turn = (turn + 1) % parseInt(numberOfPlayers);
  }
};
const handleMovement = (player, row, col) => {
  setPlayerPosition(player, col, row);
  updatePlayers();

  if (
    getTreasure(domGrid[row][col].children[0].src.split("/")[4]) ==
    player.goals[player.currenGoal]
  ) {
    player.currenGoal++;

    let test = currentTreasure(player);
    if (test) {
      switch (player.turn) {
        case 0:
          cardsOne.innerHTML = "<h1>WINNER</h1>";
          break;
        case 1:
          cardsTwo.innerHTML = "<h1>WINNER</h1>";
          break;
        case 2:
          cardsThree.innerHTML = "<h1>WINNER</h1>";
          break;
        case 3:
          cardsFour.innerHTML = "<h1>WINNER</h1>";
          break;

        default:
          break;
      }
    }
  }
  cleanUpFunction();
  tiles = document.querySelectorAll("td");
  turnNumber.innerHTML = `Player ${turn + 1}'s Turn'`;
};
const currentTreasure = (player) => {
  if (player.currenGoal < player.goals.length) {
    drawGoals(player);
    return false;
  } else return true;
};
const drawGoals = (player) => {
  switch (player.turn) {
    case 0:
      cardsOne.innerHTML = "";
      for (let i = 0; i < player.goals.length; i++) {
        if (i === player.currenGoal) {
          cardsOne.innerHTML += ` <img src="./src/${
            player.goals[player.currenGoal]
          }.png" style="border: 1px solid red" class="goalImage"/>`;
        } else {
          cardsOne.innerHTML += ` <img src="./src/${player.goals[i]}.png"  class="goalImage"/>`;
        }
      }
      break;
    case 1:
      cardsTwo.innerHTML = "";
      for (let i = 0; i < player.goals.length; i++) {
        if (i === player.currenGoal) {
          cardsTwo.innerHTML += ` <img src="./src/${
            player.goals[player.currenGoal]
          }.png" style="border: 1px solid red " class="goalImage"/>`;
        } else {
          cardsTwo.innerHTML += ` <img src="./src/${player.goals[i]}.png" class="goalImage"/>`;
        }
      }
      break;
    case 2:
      cardsThree.innerHTML = "";
      for (let i = 0; i < player.goals.length; i++) {
        if (i === player.currenGoal) {
          cardsThree.innerHTML += ` <img src="./src/${
            player.goals[player.currenGoal]
          }.png" style="border: 1px solid red;" class="goalImage"/>`;
        } else {
          cardsThree.innerHTML += ` <img src="./src/${player.goals[i]}.png" class="goalImage"/>`;
        }
      }
      break;
    case 3:
      cardsFour.innerHTML = "";
      for (let i = 0; i < player.goals.length; i++) {
        if (i === player.currenGoal) {
          cardsFour.innerHTML += ` <img src="./src/${
            player.goals[player.currenGoal]
          }.png" style="border: 1px solid red"  class="goalImage"/>`;
        } else {
          cardsFour.innerHTML += ` <img src="./src/${player.goals[i]}.png" class="goalImage" />`;
        }
      }
      break;
  }
};
