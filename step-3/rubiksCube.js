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
let boxes = inputCubeBox($outputBox, VIEW_CONTAINER);
let cube = drawCube(boxes, LINE_CONTAINER);

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

// input cube in the box
function inputCubeBox(box, className) {
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

// input cube value
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
