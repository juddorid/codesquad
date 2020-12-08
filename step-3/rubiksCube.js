const colorSet = ['B', 'W', 'O', 'G', 'Y', 'R'];
const commandSet = ['F', 'R', 'U', 'B', 'L', 'D'];
const RUBIKS = 3;
const CONTAINER = 'line_container';
const WRAPPER = 'wrapper';
const COLORBOX = 'color_box';

const $containerBox = document.querySelector('#container_box');
const $inputButton = document.querySelector('#input_btn');
const $inputBox = document.querySelector('body > div > div.input_container > input.input_box');
let cubeCount = 0;

let rubiksCube = getRubiksCube(colorSet);
let lineFloor = createFloor($containerBox, CONTAINER);

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

// rubiks cube
function getRubiksCube(set) {
  let rubiksCube = [];
  for (let i = 0; i < set.length; i++) {
    rubiksCube.push(getRubiks(set[i]));
  }
  return rubiksCube;
}

// create div
function createDIV(className) {
  let tempDiv = document.createElement('div');
  tempDiv.className = className;
  return tempDiv;
}

// append container
function appendDIV(where, what) {
  let appendDiv = where.append(what);
  return appendDiv;
}

// create floor for line container
function createFloor(box, className) {
  const FLOORS = 3;
  for (let i = 0; i < FLOORS; i++) {
    appendDIV(box, createDIV(className));
  }
}

// create wrapper > and color box in line container
function createCubeDOM() {
  const boxSize = 9;
  let lineFloor = createDIV(WRAPPER);
  for (let i = 0; i < boxSize; i++) {
    lineFloor.append(createDIV(COLORBOX));
  }
  return lineFloor;
}

function inputCubeValue(cube, containerBox) {
  let cubeArray = getCubeArray(cube);
  let colorBox = containerBox.children;
  for (let i = 0; i < colorBox.length; i++) {
    colorBox[i].innerText = cubeArray[i];
  }
}
function getColor(containerBox) {
  const colorSet = { B: 'brown', W: 'lightgray', O: 'orange', G: 'green', Y: 'yellow', R: 'red' };
  let colorBox = containerBox.children;
  for (let i = 0; i < colorBox.length; i++) {
    colorBox[i].style.background = colorSet[colorBox[i].innerText];
  }
}

// let box = createCubeDOM();
// inputCubeValue(cube, box);
// getColor(box);
// containerBox.append(box);
// wrapperCount++;
