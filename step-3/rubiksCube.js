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

let key = 'FLRBTO';
let keyArr = key.split('');

let mykeyMap = new Map();
mykeyMap.set('F', 'FLRBTO');
mykeyMap.set('L', 'LBFRTO');
mykeyMap.set('R', 'RFBLTO');
mykeyMap.set('B', 'BRLFTO');
mykeyMap.set('T', 'TLROBF');
mykeyMap.set('O', 'OLRTFB');

function getKey(value) {
  key = mykeyMap.get(value);
  keyArr = key.split('');
  return keyArr;
}

let keyFront = 'F';
let keyLeft = 'L';
let keyRight = 'R';
let keyBottom = 'B';
let keyTop = 'T';
let keyBack = 'O';

let myCube = new Map();

myCube.set('F', rubiksCube[2]);
myCube.set('L', rubiksCube[1]);
myCube.set('R', rubiksCube[3]);
myCube.set('B', rubiksCube[5]);
myCube.set('T', rubiksCube[0]);
myCube.set('O', rubiksCube[4]);

// default key
function getCurrentKey(value) {
  let current = [0, 0, 0, 0, 0, 0];
  let newKeyList = getKey(value);
  let currentKeyList = current.map((e, i) => (e = newKeyList[i]));
  return currentKeyList;
}

let currentKey = getCurrentKey('L');

function getNewKey(value) {
  let currentKeyList = getCurrentKey(value);
  keyFront = currentKeyList[0];
  keyLeft = currentKeyList[1];
  keyRight = currentKeyList[2];
  keyBottom = currentKeyList[3];
  keyTop = currentKeyList[4];
  keyBack = currentKeyList[5];
}

let cubeTop = myCube.get(keyTop);
let cubeLeft = myCube.get(keyLeft);
let cubeFront = myCube.get(keyFront);
let cubeRight = myCube.get(keyRight);
let cubeBack = myCube.get(keyBack);
let cubeBottom = myCube.get(keyBottom);

// 상대값으로 위치를 다시 명명해주면?
// 처음에는 F가 F인데, R을 돌려! 하면 R이 F인거야
// 그러면 R을 F라고 하고, 각자가 위치를 다시 생각한다
// 명령에 따라 큐브의 정면이 바뀐다
// 큐브 자체가 돌아가는 설정
// F: fornt // L: left // R: right // B: bottom // T: top // O: opposite
/////////////////////////////////////////////////////////////////////////
// FLRBTO (standard) // 처음 알파벳이 정면
// FLRBTO
// RFBLTO
// BRLFTO
// LBFRTO
// TLROBF
// OLRTFB
/////////////////////////////////////////////////////////////////////////

function rotate(command) {
  function rotateClockWise(command) {
    function planeSample() {
      let num = 1;
      let test = [];
      for (let i = 0; i < 3; i++) {
        let temp = [];
        for (let j = 0; j < 3; j++) {
          temp.push(num);
          num++;
        }
        test.push(temp);
      }
      return test;
    }
    // array 90도 회전시키기
    // 정면 90도 회전
    let rotateArr = planeSample();
    rotateArr[0][0] = command[2][0];
    rotateArr[0][1] = command[1][0];
    rotateArr[0][2] = command[0][0];
    rotateArr[1][0] = command[2][1];
    rotateArr[1][2] = command[0][1];
    rotateArr[2][0] = command[2][2];
    rotateArr[2][1] = command[1][2];
    rotateArr[2][2] = command[0][2];
    return rotateArr;
  }
  // 한쪽면 값 먼저 get
  function fix(right) {
    let fix = [right[0][0], right[1][0], right[2][0]];
    return fix;
  }
  // 기준면의 주변면의 회전 루틴
  // T_bottom => R_elft => B_top => L_right => T_bottom
  function topToRight(top, right) {
    right[0][0] = top[2][0];
    right[1][0] = top[2][1];
    right[2][0] = top[2][2];
    return right;
  }

  function leftToTop(left, top) {
    top[2][0] = left[2][2];
    top[2][1] = left[1][2];
    top[2][2] = left[0][2];
    return top;
  }

  function bottomToLeft(bottom, left) {
    left[0][2] = bottom[0][0];
    left[1][2] = bottom[0][1];
    left[2][2] = bottom[0][2];
    return left;
  }

  function rightToBottom(fix, bottom) {
    bottom[0][0] = fix[0];
    bottom[0][1] = fix[1];
    bottom[0][2] = fix[2];
    return fix;
  }

  // operating
  let fixed = fix(cubeRight);
  rotateClockWise(command);
  topToRight(cubeTop, cubeRight);
  leftToTop(cubeLeft, cubeTop);
  bottomToLeft(cubeBottom, cubeLeft);
  rightToBottom(fixed, cubeBottom);
  return rubiksCube;
}

// F
function rotateFrontA(command) {
  rotate(command);
  addCube();
}

// F'
function rotateFrontB(command) {
  rotate(command);
  rotate(command);
  rotate(command);
  addCube();
}
