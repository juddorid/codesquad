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
const myCube = [
  ['R', 'R', 'W'],
  ['G', 'C', 'W'],
  ['G', 'B', 'B'],
];
const stringSet = ['U', "U'", 'R', "R'", 'L', "L'", 'B', "B'", 'Q'];
const $containerBox = document.querySelector('#container_box');
const $inputButton = document.querySelector('#input_btn');
const $inputBox = document.querySelector('body > div > div.input_container > input.input_box');
const WRAPPER = 'wrapper';
const queryWRAPPER = '.wrapper';
const queryCOLORBOX = '.color_box';
let $wrapper;
let wrapperCount = 0;

getCube(myCube, $containerBox);

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

const currentCube = function (cube) {
  let newCube = [];
  for (let i = 0; i < cube.length; i++) {
    for (let j = 0; j < cube.length; j++) {
      newCube.push(cube[i][j]);
    }
  }
  return newCube;
};

// U
const upperLeft = function (currentArr) {
  let moveArr = [currentArr[0][0], currentArr[0][1], currentArr[0][2]];
  moveArr.push(moveArr.shift());
  for (let i = 0; i < currentArr.length; i++) {
    currentArr[0][i] = moveArr[i];
  }
  getCube(myCube, $containerBox);
};

// U'
const upperRight = function (currentArr) {
  let moveArr = [currentArr[0][0], currentArr[0][1], currentArr[0][2]];
  moveArr.unshift(moveArr.pop());
  for (let i = 0; i < currentArr.length; i++) {
    currentArr[0][i] = moveArr[i];
  }
  getCube(myCube, $containerBox);
};

// R
const rightUp = function (currentArr) {
  let moveArr = [currentArr[0][2], currentArr[1][2], currentArr[2][2]];
  moveArr.push(moveArr.shift());
  for (let i = 0; i < currentArr.length; i++) {
    currentArr[i][2] = moveArr[i];
  }
  getCube(myCube, $containerBox);
};

// R'
const rightDown = function (currentArr) {
  let moveArr = [currentArr[0][2], currentArr[1][2], currentArr[2][2]];
  moveArr.unshift(moveArr.pop());
  for (let i = 0; i < currentArr.length; i++) {
    currentArr[i][2] = moveArr[i];
  }
  getCube(myCube, $containerBox);
};

// L (warning! opposite direction!)
const leftDown = function (currentArr) {
  let moveArr = [currentArr[0][0], currentArr[1][0], currentArr[2][0]];
  moveArr.unshift(moveArr.pop());
  for (let i = 0; i < currentArr.length; i++) {
    currentArr[i][0] = moveArr[i];
  }
  getCube(myCube, $containerBox);
};

// L' (warning! opposite direction!)
const leftUp = function (currentArr) {
  let moveArr = [currentArr[0][0], currentArr[1][0], currentArr[2][0]];
  moveArr.push(moveArr.shift());
  for (let i = 0; i < currentArr.length; i++) {
    currentArr[i][0] = moveArr[i];
  }
  getCube(myCube, $containerBox);
};

// B
const bottomRight = function (currentArr) {
  let upperArr = [currentArr[2][0], currentArr[2][1], currentArr[2][2]];
  upperArr.unshift(upperArr.pop());
  for (let i = 0; i < currentArr.length; i++) {
    currentArr[2][i] = upperArr[i];
  }
  getCube(myCube, $containerBox);
};

// B'
const bottomLeft = function (currentArr) {
  let upperArr = [currentArr[2][0], currentArr[2][1], currentArr[2][2]];
  upperArr.push(upperArr.shift());
  for (let i = 0; i < currentArr.length; i++) {
    currentArr[2][i] = upperArr[i];
  }
  getCube(myCube, $containerBox);
};

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
//(singleQuote 정리)
// 공백제거
// 문자열 유효한지 검사
const valueCheck = function (value) {
  let valueArr = value.split('');
  let upperValueArr = valueArr.map((e) => e.toUpperCase());
  spaceCheck(upperValueArr);
  let noSpaceArr = delSpace(upperValueArr);
  checkSingleQuote(noSpaceArr);
  let noSingleQuoteArr = delSingleQuote(noSpaceArr);
  stringCheck(noSingleQuoteArr);

  function spaceCheck(value) {
    if (value.length === 0) {
      alert('값을 입력해주세요.(빈칸입니다.)');
      $inputBox.focus();
    }
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
  function stringCheck(value) {
    let count = 0;
    for (let i = 0; i < value.length; i++) {
      if (!stringSet.includes(value[i])) {
        count++;
      }
    }
    if (count !== 0) {
      alert("알 수 없는 입력값이 있습니다.\n(유효한 입력값: U, U', R, R', L, L', B, B', Q)");
      $inputBox.value = '';
      $inputBox.focus();
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
      $inputBox.value = '';
      $inputBox.focus();
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
  return noSpaceArr;
};

// movePart
const findingMove = function () {
  let command = getInputValue();
  for (let i = 0; i < command.length; i++) {
    for (let j = 0; j < stringSet.length; j++) {
      if (command[i] === stringSet[j]) {
        movingCube(command[i]);
      }
    }
  }
};

const movingCube = function (value) {
  if (value === stringSet[0]) {
    upperLeft(myCube);
  } else if (value === stringSet[1]) {
    upperRight(myCube);
  } else if (value === stringSet[2]) {
    rightUp(myCube);
  } else if (value === stringSet[3]) {
    rightDown(myCube);
  } else if (value === stringSet[4]) {
    leftDown(myCube);
  } else if (value === stringSet[5]) {
    leftUp(myCube);
  } else if (value === stringSet[6]) {
    bottomRight(myCube);
  } else if (value === stringSet[7]) {
    bottomLeft(myCube);
  } else if (value === stringSet[8]) {
    quitBye();
  }
};
