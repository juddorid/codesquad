const colorSet = ['B', 'W', 'O', 'G', 'Y', 'R'];
const commandSet = ['F', "F'", 'R', "R'", 'U', "U'", 'B', "B'", 'L', "L'", 'D', "D'", 'Q'];
const RUBIKS = 3;
const MIDDLE = 4;
const VIEW_CONTAINER = 'view_container';
const LINE_CONTAINER = 'line_container';
const WRAPPER = 'wrapper';
const COLORBOX = 'color_box';
const $outputBox = document.querySelector('#output_box');
const $inputButton = document.querySelector('#input_btn');
const $inputBox = document.querySelector('body > div > div.input_container > input.input_box');

let cubeCount = 0;

// init
let rubiksCube = getRubiksCube(colorSet);
let cube = addCube();

// rubiks cube
function getRubiksCube(set) {
  // plane cube
  function getRubiks(color) {
    let rubiks = [];
    for (let i = 0; i < RUBIKS; i++) {
      let temp = [];
      for (let j = 0; j < RUBIKS; j++) {
        temp.push(color);
      }
      rubiks.push(temp);
    }
    return rubiks;
  }
  let rubiksCube = [];
  for (let i = 0; i < set.length; i++) {
    rubiksCube.push(getRubiks(set[i]));
  }
  return rubiksCube;
}

// add cube
function addCube() {
  // input cube value
  function inputCubeValue(cube, containerBox) {
    let cubeArray = getCubeArray(cube);
    for (let i = 0; i < containerBox.length; i++) {
      containerBox[i].innerText = cubeArray[i];
    }
  }
  // input cube color
  function getColor(containerBox) {
    const colorSet = { B: 'purple', W: 'darkgray', O: 'orange', G: 'green', Y: 'yellowgreen', R: 'red' };
    for (let i = 0; i < containerBox.length; i++) {
      containerBox[i].style.background = colorSet[colorBox[i].innerText];
    }
  }
  let bigBox = createBox($outputBox, VIEW_CONTAINER);
  let cube = drawCube(bigBox, LINE_CONTAINER);
  let colorBox = cube.getElementsByClassName(COLORBOX);
  inputCubeValue(rubiksCube, colorBox);
  getColor(colorBox);
  return cube;
}

// create box
function createBox(box, className) {
  let container = createDIV(className);
  box.append(container);
  return container;
}

// drawing Cube
function drawCube(box, className) {
  function oneWrapper() {
    let container = createDIV(className);
    container.append(createCubeDOM());
    box.append(container);
  }
  function middleWrapper() {
    let container = createDIV(className);
    for (let i = 0; i < MIDDLE; i++) {
      container.append(createCubeDOM());
      box.append(container);
    }
  }
  oneWrapper();
  middleWrapper();
  oneWrapper();
  return box;
}
// create div
function createDIV(className) {
  let tempDiv = document.createElement('div');
  tempDiv.className = className;
  return tempDiv;
}
// create wrapper > and color box in line container
function createCubeDOM() {
  const boxSize = 9;
  let wrapper = createDIV(WRAPPER);
  for (let i = 0; i < boxSize; i++) {
    wrapper.append(createDIV(COLORBOX));
  }
  return wrapper;
}
// get Cube Array
function getCubeArray(cube) {
  let cubeArray = [];
  for (let i = 0; i < cube.length; i++) {
    for (let j = 0; j < cube[i].length; j++) {
      for (let k = 0; k < cube[i][j].length; k++) {
        cubeArray.push(cube[i][j][k]);
      }
    }
  }
  return cubeArray;
}

// 회전된 배열
function rotateFaces(cube, degree) {
  function rotate90(cube) {
    let newArr = JSON.parse(JSON.stringify(cube));
    let cubeLength = cube.length;
    for (let i = 0; i < cubeLength; i++) {
      for (let j = 0; j < cubeLength; j++) {
        newArr[i][j] = cube[cubeLength - j - 1][i];
      }
    }
    return newArr;
  }
  function rotate180(cube) {
    let newArr = JSON.parse(JSON.stringify(cube));
    let cubeLength = cube.length;
    for (let i = 0; i < cubeLength; i++) {
      for (let j = 0; j < cubeLength; j++) {
        newArr[i][j] = cube[cubeLength - i - 1][cubeLength - j - 1];
      }
    }
    return newArr;
  }
  function rotate270(cube) {
    let newArr = JSON.parse(JSON.stringify(cube));
    let cubeLength = cube.length;
    for (let i = 0; i < cubeLength; i++) {
      for (let j = 0; j < cubeLength; j++) {
        newArr[i][j] = cube[j][cubeLength - i - 1];
      }
    }
    return newArr;
  }
  let newArr = [];
  if (degree === 90) {
    newArr = rotate90(cube);
  } else if (degree === 180) {
    newArr = rotate180(cube);
  } else if (degree === 270) {
    newArr = rotate270(cube);
  }
  return newArr;
}

let mykeyMap = {
  F: { F: rubiksCube[2], U: rubiksCube[0], D: rubiksCube[5], L: rubiksCube[1], R: rubiksCube[3] },
  L: {
    F: rubiksCube[1],
    U: rotateFaces(rubiksCube[0], 270),
    D: rotateFaces(rubiksCube[5], 90),
    L: rubiksCube[4],
    R: rubiksCube[2],
  },
  R: {
    F: rubiksCube[3],
    U: rotateFaces(rubiksCube[0], 90),
    D: rotateFaces(rubiksCube[5], 270),
    L: rubiksCube[2],
    R: rubiksCube[4],
  },
  B: {
    F: rubiksCube[4],
    U: rotateFaces(rubiksCube[0], 180),
    D: rotateFaces(rubiksCube[5], 180),
    L: rubiksCube[3],
    R: rubiksCube[1],
  },
  U: {
    F: rubiksCube[0],
    U: rotateFaces(rubiksCube[3], 180),
    D: rubiksCube[2],
    L: rotateFaces(rubiksCube[1], 90),
    R: rotateFaces(rubiksCube[3], 270),
  },
  D: {
    F: rubiksCube[5],
    U: rubiksCube[2],
    D: rotateFaces(rubiksCube[4], 180),
    L: rotateFaces(rubiksCube[1], 270),
    R: rotateFaces(rubiksCube[3], 90),
  },
};

let currentKey = mykeyMap.D;

// rotate right
function rotateA(key) {
  rotate(key);
  addCube();
}

// rotate left
function rotateB(key) {
  rotate(key);
  rotate(key);
  rotate(key);
  addCube();
}

function rotate(key) {
  // 기준면 회전
  rotateFaces(key, 90);
  // 한쪽면 값 먼저 get
  function fix(right) {
    let fix = [right[0][0], right[1][0], right[2][0]];
    return fix;
  }
  // 기준면의 주변면의 회전 루틴
  // T_bottom => R_elft => B_top => L_right => T_bottom
  function upToRight(up, right) {
    right[0][0] = up[2][0];
    right[1][0] = up[2][1];
    right[2][0] = up[2][2];
    return right;
  }

  function leftToUp(left, up) {
    up[2][0] = left[2][2];
    up[2][1] = left[1][2];
    up[2][2] = left[0][2];
    return up;
  }

  function downToLeft(down, left) {
    left[0][2] = down[0][0];
    left[1][2] = down[0][1];
    left[2][2] = down[0][2];
    return left;
  }

  function rightToDown(fix, down) {
    down[0][0] = fix[0];
    down[0][1] = fix[1];
    down[0][2] = fix[2];
    return fix;
  }
  let cubeUp = cube.get('U');
  let cubeRight = cube.get('R');
  let cubeLeft = cube.get('L');
  let cubeDown = cube.get('D');

  // operating
  let fixed = fix(cubeRight);
  rotateClockWise(cube);
  upToRight(cubeUp, cubeRight);
  leftToUp(cubeLeft, cubeUp);
  downToLeft(cubeDown, cubeLeft);
  rightToDown(fixed, cubeDown);
  return rubiksCube;
}
