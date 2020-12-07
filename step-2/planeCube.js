// plane Cube
const initialCube = [
  ['R', 'R', 'W'],
  ['G', 'C', 'W'],
  ['G', 'B', 'B'],
];

const $containerBox = document.getElementById('container_box');
const $colorValueBox = document.getElementsByClassName('color_box');
const colorSet = { R: 'red', W: 'darkgray', G: 'green', C: 'cyan', B: 'blue' };

const getCubeArray = function (arr) {
  let cubeArray = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      cubeArray.push(arr[i][j]);
    }
  }
  return cubeArray;
};

const createWrapper = function () {
  let tempDiv = document.createElement('div');
  tempDiv.className = 'wrapper';
  tempDiv.id = 'color_box_wrapper';
  $containerBox.append(tempDiv);
};

const createColorBox = function () {
  const $colorBoxWrapper = document.getElementById('color_box_wrapper');
  let tempDiv = document.createElement('div');
  tempDiv.className = 'color_box';
  $colorBoxWrapper.append(tempDiv);
};

const getCubeBox = function () {
  createWrapper();
  for (let i = 0; i < 9; i++) {
    createColorBox();
  }
};

const inputColorValue = function () {
  let cubeArray = getCubeArray(initialCube);
  for (let i = 0; i < $colorValueBox.length; i++) {
    $colorValueBox[i].innerText = cubeArray[i];
  }
};

const getColor = function () {
  for (let i = 0; i < $colorValueBox.length; i++) {
    $colorValueBox[i].style.background = colorSet[$colorValueBox[i].innerText];
  }
};

getCubeBox();
inputColorValue();
getColor();
