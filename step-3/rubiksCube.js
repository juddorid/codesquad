const colorList = ['B', 'W', 'O', 'G', 'Y', 'R'];
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
let rubiksCube = getRubiksCube(colorList);
let cube = addCube();

// rubiks cube
function getRubiksCube(list) {
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
  for (let i = 0; i < list.length; i++) {
    rubiksCube.push(getRubiks(list[i]));
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

function getCurrnetCube(cube) {
  let mykeyMap = {
    F: {
      F: cube[2],
      U: cube[0],
      D: cube[5],
      L: cube[1],
      R: cube[3],
      B: cube[4],
    },
    L: {
      F: cube[1],
      U: rotateFaces(cube[0], 270),
      D: rotateFaces(cube[5], 90),
      L: cube[4],
      R: cube[2],
      B: cube[3],
    },
    R: {
      F: cube[3],
      U: rotateFaces(cube[0], 90),
      D: rotateFaces(cube[5], 270),
      L: cube[2],
      R: cube[4],
      B: cube[1],
    },
    B: {
      F: cube[4],
      U: rotateFaces(cube[0], 180),
      D: rotateFaces(cube[5], 180),
      L: cube[3],
      R: cube[1],
      B: cube[2],
    },
    U: {
      F: cube[0],
      U: rotateFaces(cube[4], 180),
      D: cube[2],
      L: rotateFaces(cube[1], 90),
      R: rotateFaces(cube[3], 270),
      B: cube[5],
    },
    D: {
      F: cube[5],
      U: cube[2],
      D: rotateFaces(cube[4], 180),
      L: rotateFaces(cube[1], 270),
      R: rotateFaces(cube[3], 90),
      B: cube[0],
    },
  };
  return mykeyMap;
}
let currentCube = getCurrnetCube(rubiksCube);
let currentKey = currentCube.D;

// rotate right
function rotateA(cube, key) {
  rotate(cube, key);
  addCube();
}

// rotate left
function rotateB(cube, key) {
  rotate(cube, key);
  rotate(cube, key);
  rotate(cube, key);
  addCube();
}

function rotate(cube, key) {
  // operating
  let fixed = fix(key.R);
  // 기준면 회전
  rotateFaces(key.F, 90);
  upToRight(key.U, key.R);
  leftToUp(key.L, key.U);
  downToLeft(key.D, key.L);
  rightToDown(fixed, key.D);

  // 한쪽면 값 먼저 get
  function fix(R) {
    let fix = [R[0][0], R[1][0], R[2][0]];
    return fix;
  }
  // 기준면의 주변면의 회전 루틴
  // T_bottom => R_elft => B_top => L_right => T_bottom
  function upToRight(U, R) {
    R[0][0] = U[2][0];
    R[1][0] = U[2][1];
    R[2][0] = U[2][2];
    return R;
  }

  function leftToUp(L, U) {
    U[2][0] = L[2][2];
    U[2][1] = L[1][2];
    U[2][2] = L[0][2];
    return U;
  }

  function downToLeft(D, L) {
    L[0][2] = D[0][0];
    L[1][2] = D[0][1];
    L[2][2] = D[0][2];
    return L;
  }

  function rightToDown(fix, D) {
    D[0][0] = fix[0];
    D[0][1] = fix[1];
    D[0][2] = fix[2];
    return fix;
  }
  function getNewCube(cube, key) {
    // function checkCenterValue(cube, key) {
    //   let defaultFaceValues = [key.F[1][1], key.U[1][1], key.D[1][1], key.L[1][1], key.R[1][1], key.B[1][1]];
    //   let currentFaces = [key.F, key.U, key.D, key.L, key.R, key.B];
    //   for (let i = 0; i < cube.length; i++) {
    //     for (let j = 0; j < defaultFaceValues.length; j++) {
    //       if (cube[i][1][1] === defaultFaceValues[j]) {
    //         cube[i] = currentFaces[j];
    //       }
    //     }
    //   }
    //   return cube;
    // }
    // let newCube = checkCenterValue(cube, key);
    // return newCube;
    cube[0] = key.U;
    cube[1] = key.L;
    cube[2] = key.F;
    cube[3] = key.R;
    cube[4] = key.B;
    cube[5] = key.D;
  }
  let myCurrentCube = getNewCube(cube, key);
  return myCurrentCube;
}

// Q
const quitBye = function () {
  $inputBox.value = 'BYE~!';
};

// getInputValue
const getInputValue = function () {
  let inputValue = $inputBox.value;
  let lastValue = valueCheck(inputValue);
  return lastValue;
};

// U U' R R' L L' B B' Q
// (singleQuote 정리)
// 공백제거
// 문자열 유효한지 검사
const valueCheck = function (value) {
  let checkValue = true;
  let valueArr = value.split('');
  let upperValueArr = valueArr.map((e) => e.toUpperCase());
  let noSpaceArr = delSpace(upperValueArr);
  spaceCheck(noSpaceArr);
  checkSingleQuote(noSpaceArr);
  let noSingleQuoteArr = delSingleQuote(noSpaceArr);
  stringCheck(noSingleQuoteArr);
  if (checkValue) {
    return noSingleQuoteArr;
  } else if (!checkValue) {
    return checkValue;
  }

  function delSpace(value) {
    let noSpaceArr = [];
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== ' ') {
        noSpaceArr.push(value[i]);
      }
    }
    return noSpaceArr;
  }
  function spaceCheck(value) {
    if (value.length === 0) {
      alert('값을 입력해주세요.(빈칸입니다.)');
      $inputBox.focus();
      checkValue = false;
      return checkValue;
    }
  }
  function checkSingleQuote(value) {
    let count = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === "'" && value[i - 1] === "'") {
        count++;
      }
    }
    if (count !== 0) {
      alert('잘못된 입력입니다.(sigleQuote연속)');
      resetFocus();
      checkValue = false;
      return checkValue;
    }
    return value;
  }
  function delSingleQuote(value) {
    let noSingleQuoteArr = [];
    for (let i = 0; i < value.length; i++) {
      if (value[i] === "'") {
        noSingleQuoteArr.pop();
        noSingleQuoteArr.push(value[i - 1] + value[i]);
      } else {
        noSingleQuoteArr.push(value[i]);
      }
    }
    return noSingleQuoteArr;
  }
  function stringCheck(value) {
    let count = 0;
    for (let i = 0; i < value.length; i++) {
      if (!stringSet.includes(value[i])) {
        count++;
      }
    }
    if (count !== 0) {
      alert("알 수 없는 입력값이 있습니다.\n(유효한 입력값: U, U', R, R', L, L', B, B', Q)");
      resetFocus();
      checkValue = false;
      return checkValue;
    }
  }
};

// movePart
const findingMove = function () {
  let command = getInputValue();
  if (command === false) {
    return;
  }
  for (let i = 0; i < command.length; i++) {
    for (let j = 0; j < stringSet.length; j++) {
      if (command[i] === stringSet[j]) {
        getCommandViewBox(command[i]);
        movingCube(command[i]);
      }
    }
  }
  resetFocus();
};

const movingCube = function (value) {
  switch (value) {
    case stringSet[0]:
      upperLeft(newCube);
      break;
    case stringSet[1]:
      upperRight(newCube);
      break;
    case stringSet[2]:
      rightUp(newCube);
      break;
    case stringSet[3]:
      rightDown(newCube);
      break;
    case stringSet[4]:
      leftDown(newCube);
      break;
    case stringSet[5]:
      leftUp(newCube);
      break;
    case stringSet[6]:
      bottomRight(newCube);
      break;
    case stringSet[7]:
      bottomLeft(newCube);
      break;
    case stringSet[8]:
      quitBye();
      break;
    default:
      break;
  }
};

// reset
const resetFocus = function () {
  $inputBox.value = '';
  $inputBox.focus();
};
