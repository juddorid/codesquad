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

let myCube = new Map();

let keyTop = 'top';
let keyFront = 'front';
let keyBack = 'back';
let keyRight = 'right';
let keyLeft = 'left';
let keyBottom = 'bottom';

let colorTop = 'B';
let colorFront = 'O';
let colorBack = 'Y';
let colorRight = 'G';
let colorLeft = 'W';
let colorBottom = 'R';

myCube.set(keyTop, rubiksCube[0]);
myCube.set(keyFront, rubiksCube[2]);
myCube.set(keyBack, rubiksCube[4]);
myCube.set(keyRight, rubiksCube[3]);
myCube.set(keyLeft, rubiksCube[1]);
myCube.set(keyBottom, rubiksCube[5]);

// F : front가 시계 방향으로 (오른쪽으로)
// F => 90도 회전
// T_bottom => R_elft => B_top => L_right => T_bottom

// array 90도 회전시키기

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

function rotateFront(arr) {
  function rotateRight(front) {
    let rotateArr = planeSample();
    rotateArr[0][0] = arr[2][0];
    rotateArr[0][1] = arr[1][0];
    rotateArr[0][2] = arr[0][0];
    rotateArr[1][0] = arr[2][1];
    rotateArr[1][2] = arr[0][1];
    rotateArr[2][0] = arr[2][2];
    rotateArr[2][1] = arr[1][2];
    rotateArr[2][2] = arr[0][2];
    return rotateArr;
  }
  function fix(right) {
    let fix = [right[0][0], right[1][0], right[2][0]];
    return fix;
  }
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
  let fixed = fix(myCube.get(keyRight));
  rotateRight(myCube.get(keyFront));
  topToRight(myCube.get(keyTop), myCube.get(keyRight));
  leftToTop(myCube.get(keyLeft), myCube.get(keyTop));
  bottomToLeft(myCube.get(keyBottom), myCube.get(keyLeft));
  rightToBottom(fixed, myCube.get(keyBottom));
  addCube();
  return rubiksCube;
}
