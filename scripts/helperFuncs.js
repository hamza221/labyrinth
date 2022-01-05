const getAccesibleSides = (src) => {
  console.log(src);
  let sides = src.split("_")[1].split(".")[0];
  let result = { right: false, left: false, top: false, bottom: false };
  for (let index = 0; index < sides.length; index++) {
    switch (sides[index]) {
      case "L":
        result.left = true;
        break;
      case "R":
        result.right = true;
        break;
      case "T":
        result.top = true;
        break;
      case "B":
        result.bottom = true;
        break;

      default:
        console.error("problem on getAccesibleSides input: " + src);
        break;
    }
  }
  return result;
};
const getType = (src) => {
  return src.split("_")[0][0];
};
const getTreasure = (src) => {
  return src.split("_")[0].length === 2 ? src.split("_")[0][1] : "Blank";
};
const getAngle = (src) => {
  return parseInt(src.split("_")[2]);
};
const getXY = (td) => {
  let x = td.cellIndex;
  let y = td.parentNode.rowIndex - 1;
  return { col: x, row: y };
};
const getTileObj = (td) => {
  let src = td.children[0].src.split("/")[4];
  return {
    src: src,
    type: getType(src),
    xy: getXY(td),
    angle: getAngle(src),
    treasure: getTreasure(src),
    accesibleSides: getAccesibleSides(src),
  };
};
const getGrid = (tiles) => {
  let grid = [];
  let row1 = [];
  let row2 = [];
  domGrid = [];
  let i = -1;
  for (let row = 0; row < 7; row++) {
    row1 = [];
    row2 = [];
    for (let col = 0; col < 7; col++) {
      i++;
      let tmpObj = getTileObj(tiles[i]);
      row1.push(tmpObj);
      row2.push(tiles[i]);
    }
    grid.push(row1);
    domGrid.push(row2);
  }
  return grid;
};
const getPlayerPosition = (Player) => {
  return { x: Player.x / 86 - 1, y: Player.y / 86 - 1 };
};
const setPlayerPosition = (Player, x, y) => {
  if (y < 0) Player.y = 602;
  else Player.y = 86 + ((86 * y) % 602);
  if (x < 0) Player.x = 602;
  else Player.x = 86 + ((86 * x) % 602);
};
const cleanUpFunction = () => {
  elementsWithEventListeners.forEach((e) => {
    e.style.border = "none";
    console.log(e.parentNode);

    var new_element = e.cloneNode(true);
    e.parentNode.replaceChild(new_element, e);
  });
};
