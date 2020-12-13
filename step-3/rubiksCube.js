const colorList = ['B', 'W', 'O', 'G', 'Y', 'R'];
const cmdList = ['F', "F'", 'R', "R'", 'U', "U'", 'B', "B'", 'L', "L'", 'D', "D'", 'Q', '2'];
const VIEW_CONTAINER = 'view_container';
const LINE_CONTAINER = 'line_container';
const WRAPPER = 'wrapper';
const COLORBOX = 'color_box';
const $outputBox = document.querySelector('#output_box');
const $inputButton = document.querySelector('#input_btn');
const $inputBox = document.querySelector('body > div > div.input_container > input.input_box');
const $inputContainer = document.getElementsByClassName('input_container');
const BYE = 'BYE~!';

let start;
let end;
let time = 0;
let cubeCount = 1;
start = new Date().getTime();

// random
function randomCommand() {
  let ranCmdArr = [];
  const randomList = ['F', "F'", 'R', "R'", 'U', "U'", 'B', "B'", 'L', "L'", 'D', "D'"];
  while (ranCmdArr.length !== 10) {
    let randomNumber = Math.floor(Math.random() * (randomList.length - 0) + 0);
    ranCmdArr.push(randomList[randomNumber]);
    randomList.splice(randomNumber, 1);
  }
  let result = ranCmdArr;
  return result;
}

// endTime
function endTime() {
  end = new Date().getTime();
  time = (end - start) / 1000;
  getInfoViewBox(time);
}

// init
let perfectCube = getRubiksCube(colorList);
let rubiksCube = getRubiksCube(colorList);
let cube = addCube();
isPerfectCube();
// rubiks cube
function getRubiksCube(list) {
  // plane cube
  function getRubiks(color) {
    const RUBIKS = 3;
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
  let bigBox = createBox($outputBox, VIEW_CONTAINER);
  let cube = drawCube(bigBox, LINE_CONTAINER);
  let colorBox = cube.getElementsByClassName(COLORBOX);

  inputCubeValue(rubiksCube, colorBox);
  getColor(colorBox);

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

  return cube;
}

// create box
function createBox(box, className) {
  let container = createDIV(className);
  box.append(container);
  return container;
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

// drawing Cube
function drawCube(box, className) {
  function oneWrapper() {
    let container = createDIV(className);
    container.append(createCubeDOM());
    box.append(container);
  }
  function middleWrapper() {
    const MIDDLE = 4;
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

// command view box
function getCommandViewBox(cmd, num) {
  let box = createDIV(COLORBOX);
  $outputBox.append(box);
  box.innerText = `입력값: ${cmd} , 조작횟수: ${num}`;
}

// info view box
function getInfoViewBox(num) {
  let box = createDIV(COLORBOX);
  $inputContainer[1].append(box);
  box.innerText = `경과시간: ${num} sec`;
}

// get Cube Array
function getCubeArray(cube) {
  let lineArr = getArray(cube);
  let cubeArray = getArray(lineArr);
  return cubeArray;
}

function getArray(cube) {
  let arr = [];
  for (let i = 0; i < cube.length; i++) {
    for (let j = 0; j < cube[i].length; j++) {
      arr.push(cube[i][j]);
    }
  }
  return arr;
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

function decryption(cube) {
  let myDecryption = {
    F: {
      F: cube[2],
      U: cube[0],
      D: cube[5],
      L: cube[1],
      R: cube[3],
      B: cube[4],
    },
    L: {
      F: cube[3],
      U: rotateFaces(cube[0], 90),
      D: rotateFaces(cube[5], 270),
      L: cube[2],
      R: cube[4],
      B: cube[1],
    },
    R: {
      F: cube[1],
      U: rotateFaces(cube[0], 270),
      D: rotateFaces(cube[5], 90),
      L: cube[4],
      R: cube[2],
      B: cube[3],
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
      F: cube[5],
      U: cube[2],
      D: cube[4],
      L: rotateFaces(cube[1], 270),
      R: rotateFaces(cube[3], 90),
      B: rotateFaces(cube[0], 180),
    },
    D: {
      F: cube[0],
      U: cube[4],
      D: cube[2],
      L: rotateFaces(cube[1], 90),
      R: rotateFaces(cube[3], 270),
      B: rotateFaces(cube[5], 180),
    },
  };
  return myDecryption;
}

// select direction
function selectDirection(cube, value) {
  cmdList.indexOf(value) % 2 === 0 ? rotateA(cube, value) : rotateB(cube, value);
}

// rotate right
function rotateA(cube, value) {
  rotate(cube, value);
}

// rotate left
function rotateB(cube, value) {
  rotate(cube, value);
  rotate(cube, value);
  rotate(cube, value);
}

function rotate(cube, value) {
  let currentKey = getCurrnetCube(cube);
  let key = currentKey[value];
  // operating
  let fixed = fix(key.R);
  // 기준면 회전
  let frontFace = rotateFaces(key.F, 90);
  // 주변 4면 회전
  upToRight(key.U, key.R);
  leftToUp(key.L, key.U);
  downToLeft(key.D, key.L);
  rightToDown(fixed, key.D);
  resetFocus();

  // 현재 key(currentKey)가 바뀐 큐브의 모든 정보를 다 가지고 있음
  let rotateCube = getRotateCube(cube, key, frontFace);
  let decryptionCube = decryption(rotateCube);
  let myRubiks = decryptionCube[value];

  cube[0] = myRubiks.U;
  cube[1] = myRubiks.L;
  cube[2] = myRubiks.F;
  cube[3] = myRubiks.R;
  cube[4] = myRubiks.B;
  cube[5] = myRubiks.D;

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
    D[0][0] = fix[2];
    D[0][1] = fix[1];
    D[0][2] = fix[0];
    return D;
  }
  function getRotateCube(cube, key, stdFace) {
    cube[0] = key.U;
    cube[1] = key.L;
    cube[2] = stdFace;
    cube[3] = key.R;
    cube[4] = key.B;
    cube[5] = key.D;
    return cube;
  }

  return cube;
}

// 큐브가 완성인지 확인
function isPerfectCube() {
  let prev = getCubeArray(rubiksCube);
  let perfect = getCubeArray(perfectCube);
  let count = 0;
  let result = false;
  perfect.forEach((element, i) => {
    if (element === prev[i]) {
      count++;
    }
    if (cubeCount > 2 && count === perfect.length) {
      quitBye();
      let box = createDIV(COLORBOX);
      $inputContainer[1].append(box);
      box.innerText = `조작횟수: ${cubeCount - 1}`;
      let box2 = createDIV(COLORBOX);
      $inputContainer[1].append(box2);
      box2.innerText = '완성!!! 축하합니다.';
      result = true;
    }
  });
  return result;
}

// Q
function quitBye(time) {
  $inputBox.value = BYE;
  endTime(time);
  $inputBox.disabled = true;
}

// getInputValue
const getInputValue = function () {
  let inputValue = $inputBox.value;
  let lastValue = valueCheck(inputValue);
  console.log(lastValue);
  return lastValue;
};

// input value Check
const valueCheck = function (value) {
  const SPACE_VALUE = '값을 입력해주세요.(빈칸입니다.)';
  const SINGLE_QUOTE = '잘못된 입력입니다.(sigleQuote연속)';
  const NUMBER_NUMBER = '잘못된 입력입니다.(숫자연속)';
  const UNKNOWN_VALUE = '알 수 없는 입력값이 있습니다.';
  const RESTART = 'CUBE 버튼을 누르면 다시 시작합니다.';

  let valueArr = value.split('');
  let upperValueArr = valueArr.map((e) => e.toUpperCase());
  let noSpaceArr = delSpace(upperValueArr);
  if (finishCheck()) {
    alert(RESTART);
    return false;
  }
  if (spaceCheck(noSpaceArr)) {
    alert(SPACE_VALUE);
    $inputBox.focus();
    return false;
  }
  if (checkSingleQuote(noSpaceArr)) {
    alert(SINGLE_QUOTE);
    resetFocus();
    return false;
  }

  let noSingleQuoteArr = delSingleQuote(noSpaceArr);
  if (numberCheck()) {
    alert(NUMBER_NUMBER);
    resetFocus();
    return false;
  }
  let onlyStringValue = numberToString(noSingleQuoteArr);
  if (stringCheck(onlyStringValue)) {
    alert(UNKNOWN_VALUE);
    resetFocus();
    return false;
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
  function finishCheck() {
    if ($inputBox.disabled) return true;
  }
  function spaceCheck(value) {
    if (value.length === 0) return true;
  }
  function checkSingleQuote(value) {
    let count = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === "'" && value[i - 1] === "'") {
        count++;
      }
    }
    if (count !== 0) return true;
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
  function numberCheck() {
    let count = 0;
    for (let i = 0; i < value.length; i++) {
      if (!isNaN(value[i]) && !isNaN(value[i - 1])) {
        count++;
      }
    }
    if (count !== 0) return true;
  }
  function numberToString(value) {
    let onlyStringValueArray = [];
    for (let i = 0; i < value.length; i++) {
      if (value[i] === cmdList[13]) {
        onlyStringValueArray.push(value[i - 1]);
      } else if (value[i] !== cmdList[13] && isNaN(value[i])) {
        onlyStringValueArray.push(value[i]);
      } else {
        stringCheck(value);
      }
    }
    return onlyStringValueArray;
  }

  function stringCheck(value) {
    let count = 0;
    for (let i = 0; i < value.length; i++) {
      if (!cmdList.includes(value[i])) {
        count++;
      }
    }
    if (count !== 0) return true;
  }
  return onlyStringValue;
};

// movePart
const findingMove = function () {
  let command = getInputValue();
  if (command === false) {
    return;
  }
  rotateCube(command);
};

function rotateCube(cmd) {
  for (let i = 0; i < cmd.length; i++) {
    getCommandViewBox(cmd[i], cubeCount);
    movingCube(cmd[i]);
    if (cmd[i] !== cmdList[12]) {
      addCube();
    }
    cubeCount++;
    isPerfectCube();
  }
}

function rotateRandomCube() {
  let cmd = randomCommand();
  for (let i = 0; i < cmd.length; i++) {
    movingCube(cmd[i]);
    isPerfectCube();
  }
  let randomBox = document.querySelector('#output_box > div').getElementsByClassName(COLORBOX);
  inputCubeValue(rubiksCube, randomBox);
  getColor(randomBox);
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
      containerBox[i].style.background = colorSet[containerBox[i].innerText];
    }
  }
}

const movingCube = function (value) {
  switch (value) {
    case cmdList[0]:
      rotateA(rubiksCube, value);
      break;
    case cmdList[1]:
      rotateB(rubiksCube, cmdList[0]);
      break;
    case cmdList[2]:
      rotateA(rubiksCube, value);
      break;
    case cmdList[3]:
      rotateB(rubiksCube, cmdList[2]);
      break;
    case cmdList[4]:
      rotateA(rubiksCube, value);
      break;
    case cmdList[5]:
      rotateB(rubiksCube, cmdList[4]);
      break;
    case cmdList[6]:
      rotateA(rubiksCube, value);
      break;
    case cmdList[7]:
      rotateB(rubiksCube, cmdList[6]);
      break;
    case cmdList[8]:
      rotateA(rubiksCube, value);
      break;
    case cmdList[9]:
      rotateB(rubiksCube, cmdList[8]);
      break;
    case cmdList[10]:
      rotateA(rubiksCube, value);
      break;
    case cmdList[11]:
      rotateB(rubiksCube, cmdList[10]);
      break;
    case cmdList[12]:
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
