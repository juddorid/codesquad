// > U  가장 윗줄을 왼쪽으로 한 칸 밀기 RRW -> RWR
// > U' 가장 윗줄을 오른쪽으로 한 칸 밀기 RRW -> WRR
// > R  가장 오른쪽 줄을 위로 한 칸 밀기 WWB -> WBW
// > R' 가장 오른쪽 줄을 아래로 한 칸 밀기 WWB -> BWW
// > L  가장 왼쪽 줄을 아래로 한 칸 밀기 RGG -> GRG (L의 경우 R과 방향이 반대임을 주의한다.)
// > L' 가장 왼쪽 줄을 위로 한 칸 밀기 RGG -> GGR
// > B  가장 아랫줄을 오른쪽으로 한 칸 밀기 GBB -> BGB (B의 경우도 U와 방향이 반대임을 주의한다.)
// > B' 가장 아랫줄을 왼쪽으로 한 칸 밀기 GBB -> BBG
// > Q  Bye~를 출력하고 프로그램을 종료한다.

// plane Cube
const initialCube = [
  ['R', 'R', 'W'],
  ['G', 'C', 'W'],
  ['G', 'B', 'B'],
];

const $initialContainerBox = document.getElementById('initial_container_box');
const $outputContainerBox = document.getElementById('output_container_box');

const $inputButton = document.querySelector('#input_btn');
const $colorBoxWrapper = document.getElementById('color_box_wrapper');
const $container = document.getElementsByClassName('container');
const WRAPPER = 'wrapper';
const INPUT = '.initial_container .color_box';
const OUTPUT = '.output_container .color_box';
let wrapperCount = 1;
let box = document.getElementsByClassName(WRAPPER + wrapperCount);

getCube(initialCube, $initialContainerBox);

function getCube(arr, idBox) {
  const getCubeArray = function (arr) {
    let cubeArray = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        cubeArray.push(arr[i][j]);
      }
    }
    return cubeArray;
  };
  function createWrapper(idBox) {
    let tempDiv = document.createElement('div');
    tempDiv.className = WRAPPER;
    tempDiv.classList.add(WRAPPER + wrapperCount);
    wrapperCount++;
    idBox.append(tempDiv);
  }
  function createColorBox(idBox) {
    let tempDiv = document.createElement('div');
    tempDiv.className = 'color_box';
    idBox.getElementsByClassName(WRAPPER + (wrapperCount - 1))[0].append(tempDiv);
  }
  function repeatColorBox(idBox) {
    for (let i = 0; i < 9; i++) {
      createColorBox(idBox);
    }
  }
  function inputCubeValue(arr, box) {
    let cubeArray = getCubeArray(arr);
    for (let i = 0; i < box.length; i++) {
      box[i].innerText = cubeArray[i];
    }
  }
  function getColor(box) {
    const colorSet = { R: 'red', W: 'darkgray', G: 'green', C: 'cyan', B: 'blue' };
    for (let i = 0; i < box.length; i++) {
      box[i].style.background = colorSet[box[i].innerText];
    }
  }
  createWrapper(idBox);
  repeatColorBox(idBox);
  let colorBox = box[0].getElementsByClassName('color_box');
  inputCubeValue(arr, colorBox);
  getColor(colorBox);
}

// U
const upperLeft = function (currentArr) {
  let upperArr = [currentArr[0][0], currentArr[0][1], currentArr[0][2]];
  upperArr.push(upperArr.shift());
  currentArr[0][0] = upperArr[0];
  currentArr[0][1] = upperArr[1];
  currentArr[0][2] = upperArr[2];
  return currentArr;
};

let upLeft = upperLeft(initialCube);
getCube(upLeft, $outputContainerBox);
