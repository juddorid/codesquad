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

const $containerBox = document.querySelector('#container_box');
const $inputButton = document.querySelector('#input_btn');
const WRAPPER = 'wrapper';
const queryWRAPPER = '.wrapper';
const queryCOLORBOX = '.color_box';
let $wrapper;
let wrapperCount = 0;

getCube(initialCube, $containerBox);

function getCube(cube, containerBox) {
  const getCubeArray = function (cube) {
    let cubeArray = [];
    for (let i = 0; i < cube.length; i++) {
      for (let j = 0; j < cube.length; j++) {
        cubeArray.push(cube[i][j]);
      }
    }
    return cubeArray;
  };
  function createWrapper(containerBox) {
    let tempDiv = document.createElement('div');
    tempDiv.className = WRAPPER;
    containerBox.append(tempDiv);
  }
  function createColorBox(containerBox) {
    let tempDiv = document.createElement('div');
    tempDiv.className = 'color_box';
    containerBox.querySelectorAll(queryWRAPPER)[wrapperCount].append(tempDiv);
  }
  function repeatColorBox(containerBox) {
    for (let i = 0; i < 9; i++) {
      createColorBox(containerBox);
    }
  }
  function inputCubeValue(cube, containerBox) {
    let cubeArray = getCubeArray(cube);
    for (
      let i = 0;
      i < containerBox.querySelectorAll(queryWRAPPER)[wrapperCount].querySelectorAll(queryCOLORBOX).length;
      i++
    ) {
      containerBox.querySelectorAll(queryWRAPPER)[wrapperCount].querySelectorAll(queryCOLORBOX)[i].innerText =
        cubeArray[i];
    }
  }
  function getColor(containerBox) {
    const colorSet = { R: 'red', W: 'darkgray', G: 'green', C: 'cyan', B: 'blue' };
    for (
      let i = 0;
      i < containerBox.querySelectorAll(queryWRAPPER)[wrapperCount].querySelectorAll(queryCOLORBOX).length;
      i++
    ) {
      containerBox.querySelectorAll(queryWRAPPER)[wrapperCount].querySelectorAll(queryCOLORBOX)[i].style.background =
        colorSet[
          containerBox.querySelectorAll(queryWRAPPER)[wrapperCount].querySelectorAll(queryCOLORBOX)[i].innerText
        ];
    }
  }
  createWrapper(containerBox);
  repeatColorBox(containerBox);
  inputCubeValue(cube, containerBox);
  getColor(containerBox);
  wrapperCount++;
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

// U'
const upperRight = function (currentArr) {
  let upperArr = [currentArr[0][0], currentArr[0][1], currentArr[0][2]];
  upperArr.push(upperArr.shift());
  currentArr[0][0] = upperArr[0];
  currentArr[0][1] = upperArr[1];
  currentArr[0][2] = upperArr[2];
  return currentArr;
};

// let upLeft = upperLeft(initialCube);
// getCube(upLeft, $outputContainerBox);
