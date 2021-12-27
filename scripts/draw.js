// getting dom elements
const container = document.querySelector("#gameGrid");
const extraCard = document.getElementById("extraCard");
// functions
const init = () => {
  let rdmTiles = new Array(13)
    .fill("S")
    .concat(new Array(15).fill("U"), new Array(6).fill("T"));
  let i = 0;
  for (let row = 0; row < 7; row++) {
    let tr = document.createElement("tr");
    for (let col = 0; col < 7; col++) {
      let td = document.createElement("td");
      let img = document.createElement("img");
      if (col === 0 && row == 0) {
        img.src = "../src/" + images.U.blank[0];
        td.appendChild(img);
      } else if (col === 0 && row == 6) {
        img.src = `../src/${images.U.blank[270]}`;
        td.appendChild(img);
      } else if (col === 6 && row === 0) {
        img.src = "../src/" + images.U.blank[90];
        td.appendChild(img);
      } else if (col == 6 && row == 6) {
        img.src = "../src/" + images.U.blank[180];
        td.appendChild(img);
      } else if (row === 0 && (col === 2 || col === 4)) {
        if (col == 2) {
          img.src = "../src/" + images.T.blank[270];
          td.appendChild(img);
        } else if (col == 4) {
          img.src = "../src/" + images.T.blank[270];
          td.appendChild(img);
        }
      } else if (
        row === 2 &&
        (col === 0 || col == 2 || col === 4 || col === 6)
      ) {
        if (col === 0) {
          img.src = "../src/" + images.T.blank[0];
          td.appendChild(img);
        } else if (col == 2) {
          img.src = "../src/" + images.T.blank[270];
          td.appendChild(img);
        } else if (col == 4 || col == 6) {
          img.src = "../src/" + images.T.blank[180];
          td.appendChild(img);
        }
      } else if (
        row === 4 &&
        (col === 0 || col === 2 || col === 4 || col === 6)
      ) {
        if (col === 0) {
          img.src = "../src/" + images.T.blank[0];
          td.appendChild(img);
        } else if (col == 2) {
          img.src = "../src/" + images.T.blank[0];
          td.appendChild(img);
        } else if (col == 4) {
          img.src = "../src/" + images.T.blank[90];
          td.appendChild(img);
        } else if (col == 6) {
          img.src = "../src/" + images.T.blank[180];
          td.appendChild(img);
        }
      } else if (row === 6 && (col == 2 || col == 4)) {
        img.src = "../src/" + images.T.blank[90];
        td.appendChild(img);
      } else {
        i++;
        let rdmInd = Math.floor(Math.random() * rdmTiles.length);
        let tileT = rdmTiles[rdmInd];
        rdmTiles.splice(rdmInd, 1);
        let treasureT =
          tilesContents[Math.floor(Math.random() * tilesContents.length)];
        let angles = [0, 90, 180, 270];
        let angle = angles[Math.floor(Math.random() * angles.length)];

        let tmpObj;
        switch (tileT) {
          case "S":
            tmpObj = images.S;
            break;
          case "T":
            tmpObj = images.T;
            break;
          case "U":
            tmpObj = images.U;
            break;
        }
        switch (treasureT) {
          case "G":
            tmpObj = tmpObj.ghost;
            break;
          case "J":
            tmpObj = tmpObj.jewel;
            break;
          default:
            tmpObj = tmpObj.blank;
            break;
        }
        tmpObj = tmpObj[angle];

        img.src = "../src/" + tmpObj;
        td.appendChild(img);
      }
      tr.appendChild(td);
    }
    container.appendChild(tr);
  }
  let tileT = rdmTiles[0];

  let treasureT =
    tilesContents[Math.floor(Math.random() * tilesContents.length)];
  let angles = [0, 90, 180, 270];
  let angle = angles[Math.floor(Math.random() * angles.length)];

  let tmpObj;
  switch (tileT) {
    case "S":
      tmpObj = images.S;
      break;
    case "T":
      tmpObj = images.T;
      break;
    case "U":
      tmpObj = images.U;
      break;
  }
  switch (treasureT) {
    case "G":
      tmpObj = tmpObj.ghost;
      break;
    case "J":
      tmpObj = tmpObj.jewel;
      break;
    default:
      tmpObj = tmpObj.blank;
      break;
  }
  tmpObj = tmpObj[angle];

  extraCard.src = "../src/" + tmpObj;
};

// Players
let Player1 = {
  turn: 0,
  x: 86,
  y: 86,
  goals: [],
  currenGoal: 0,
};
let Player2 = {
  turn: 1,
  x: 86,
  y: 602,
  goals: [],
  currenGoal: 0,
};

let Player3 = {
  turn: 2,
  x: 602,
  y: 86,
  goals: [],
  currenGoal: 0,
};
let Player4 = {
  turn: 3,
  x: 602,
  y: 602,
  goals: [],
  currenGoal: 0,
};

const drawPlayers = () => {
  switch (numberOfPlayers) {
    case 2:
      PlayerOne = document.createElement("img");
      PlayerOne.src = "../src/one.png";
      PlayerOne.style.position = "absolute";

      PlayerOne.style.top = `${Player1.y}px`;
      PlayerOne.style.left = `${Player1.x}px`;
      PlayerOne.addEventListener("click", () => {
        movePlayer(Player1);
      });
      PlayerTwo = document.createElement("img");
      PlayerTwo.src = "../src/two.png";
      PlayerTwo.style.position = "absolute";
      PlayerTwo.style.top = `${Player2.y}px`;
      PlayerTwo.style.left = `${Player2.x}px`;
      PlayerTwo.addEventListener("click", () => {
        movePlayer(Player2);
      });
      container.appendChild(PlayerOne);
      container.appendChild(PlayerTwo);
      break;
    case 3:
      PlayerOne = document.createElement("img");
      PlayerOne.src = "../src/one.png";
      PlayerOne.style.position = "absolute";

      PlayerOne.style.top = `${Player1.y}px`;
      PlayerOne.style.left = `${Player1.x}px`;
      PlayerOne.addEventListener("click", () => {
        movePlayer(Player1);
      });
      PlayerTwo = document.createElement("img");
      PlayerTwo.src = "../src/two.png";
      PlayerTwo.style.position = "absolute";
      PlayerTwo.style.top = `${Player2.y}px`;
      PlayerTwo.style.left = `${Player2.x}px`;
      PlayerTwo.addEventListener("click", () => {
        movePlayer(Player2);
      });
      PlayerThree = document.createElement("img");
      PlayerThree.src = "../src/three.png";
      PlayerThree.style.position = "absolute";
      PlayerThree.style.top = `${Player3.y}px`;
      PlayerThree.style.left = `${Player3.x}px`;
      PlayerThree.addEventListener("click", () => {
        movePlayer(Player3);
      });
      container.appendChild(PlayerOne);
      container.appendChild(PlayerTwo);
      container.appendChild(PlayerThree);
      break;

    case 4:
      PlayerOne = document.createElement("img");
      PlayerOne.src = "../src/one.png";
      PlayerOne.style.position = "absolute";

      PlayerOne.style.top = `${Player1.y}px`;
      PlayerOne.style.left = `${Player1.x}px`;
      PlayerOne.addEventListener("click", () => {
        movePlayer(Player1);
      });
      PlayerTwo = document.createElement("img");
      PlayerTwo.src = "../src/two.png";
      PlayerTwo.style.position = "absolute";
      PlayerTwo.style.top = `${Player2.y}px`;
      PlayerTwo.style.left = `${Player2.x}px`;
      PlayerTwo.addEventListener("click", () => {
        movePlayer(Player2);
      });
      PlayerThree = document.createElement("img");
      PlayerThree.src = "../src/three.png";
      PlayerThree.style.position = "absolute";
      PlayerThree.style.top = `${Player3.y}px`;
      PlayerThree.style.left = `${Player3.x}px`;
      PlayerThree.addEventListener("click", () => {
        movePlayer(Player3);
      });
      PlayerFour = document.createElement("img");
      PlayerFour.src = "../src/four.png";
      PlayerFour.style.position = "absolute";
      PlayerFour.style.top = `${Player4.y}px`;
      PlayerFour.style.left = `${Player4.x}px`;
      PlayerFour.addEventListener("click", () => {
        movePlayer(Player4);
      });
      container.appendChild(PlayerOne);
      container.appendChild(PlayerTwo);
      container.appendChild(PlayerThree);
      container.appendChild(PlayerFour);
      break;
  }
};
const updatePlayers = () => {
  PlayerOne.style.top = `${Player1.y}px`;
  PlayerOne.style.left = `${Player1.x}px`;
  PlayerTwo.style.top = `${Player2.y}px`;
  PlayerTwo.style.left = `${Player2.x}px`;
  if (PlayerThree) {
    PlayerThree.style.top = `${Player3.y}px`;
    PlayerThree.style.left = `${Player3.x}px`;
  }
  if (PlayerFour) {
    PlayerFour.style.top = `${Player4.y}px`;
    PlayerFour.style.left = `${Player4.x}px`;
  }
};
init();
