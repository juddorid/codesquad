const colorSet = ['B', 'W', 'O', 'G', 'Y', 'R'];
const commandSet = ['F', 'R', 'U', 'B', 'L', 'D'];
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

// inputCubeValue(cube, box);
// getColor(box);
// containerBox.append(box);
// wrapperCount++;
