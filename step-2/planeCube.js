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
const COLORBOX = 'color_box';
const queryWRAPPER = '.wrapper';
const queryCOLORBOX = '.color_box';
let wrapperCount = 0;
let newCube = myCube;

getCube(myCube, $containerBox);

function getCube(cube, containerBox) {
  function getCubeArray(cube) {
    let cubeArray = [];
    for (let i = 0; i < cube.length; i++) {
      for (let j = 0; j < cube.length; j++) {
        cubeArray.push(cube[i][j]);
      }
    }
    return cubeArray;
  }

  function createCubeDOM() {
    const boxSize = 9;
    let wrapper = createDIV(WRAPPER);
    for (let i = 0; i < boxSize; i++) {
      wrapper.append(createDIV(COLORBOX));
    }
    return wrapper;
  }

  function inputCubeValue(cube, containerBox) {
    let cubeArray = getCubeArray(cube);
    let colorBox = containerBox.children;
    for (let i = 0; i < colorBox.length; i++) {
      colorBox[i].innerText = cubeArray[i];
    }
  }
  function getColor(containerBox) {
    const colorSet = { R: '	#FF46C5', W: '#FF8C0A', G: '#6ED746', C: '#A0AFFF', B: '#5050FF' };
    let colorBox = containerBox.children;
    for (let i = 0; i < colorBox.length; i++) {
      colorBox[i].style.background = colorSet[colorBox[i].innerText];
    }
  }

  let box = createCubeDOM();
  inputCubeValue(cube, box);
  getColor(box);
  containerBox.append(box);
  wrapperCount++;
}

function createDIV(className) {
  let tempDiv = document.createElement('div');
  tempDiv.className = className;
  return tempDiv;
}

const getCommandViewBox = function (command) {
  let box = createDIV(COLORBOX);
  $containerBox.append(box);
  box.innerText = command;
};

// U
const upperLeft = function (currentArr) {
  let moveArr = [currentArr[0][0], currentArr[0][1], currentArr[0][2]];
  moveArr.push(moveArr.shift());
  for (let i = 0; i < currentArr.length; i++) {
    currentArr[0][i] = moveArr[i];
  }
  newCube = currentArr;
  getCube(currentArr, $containerBox);
  return newCube;
};

// U'
const upperRight = function (currentArr) {
  let moveArr = [currentArr[0][0], currentArr[0][1], currentArr[0][2]];
  moveArr.unshift(moveArr.pop());
  for (let i = 0; i < currentArr.length; i++) {
    currentArr[0][i] = moveArr[i];
  }
  newCube = currentArr;
  getCube(currentArr, $containerBox);
  return newCube;
};

// R
const rightUp = function (currentArr) {
  let moveArr = [currentArr[0][2], currentArr[1][2], currentArr[2][2]];
  moveArr.push(moveArr.shift());
  for (let i = 0; i < currentArr.length; i++) {
    currentArr[i][2] = moveArr[i];
  }
  newCube = currentArr;
  getCube(currentArr, $containerBox);
  return newCube;
};

// R'
const rightDown = function (currentArr) {
  let moveArr = [currentArr[0][2], currentArr[1][2], currentArr[2][2]];
  moveArr.unshift(moveArr.pop());
  for (let i = 0; i < currentArr.length; i++) {
    currentArr[i][2] = moveArr[i];
  }
  newCube = currentArr;
  getCube(currentArr, $containerBox);
  return newCube;
};

// L (warning! opposite direction!)
const leftDown = function (currentArr) {
  let moveArr = [currentArr[0][0], currentArr[1][0], currentArr[2][0]];
  moveArr.unshift(moveArr.pop());
  for (let i = 0; i < currentArr.length; i++) {
    currentArr[i][0] = moveArr[i];
  }
  newCube = currentArr;
  getCube(currentArr, $containerBox);
  return newCube;
};

// L' (warning! opposite direction!)
const leftUp = function (currentArr) {
  let moveArr = [currentArr[0][0], currentArr[1][0], currentArr[2][0]];
  moveArr.push(moveArr.shift());
  for (let i = 0; i < currentArr.length; i++) {
    currentArr[i][0] = moveArr[i];
  }
  newCube = currentArr;
  getCube(currentArr, $containerBox);
  return newCube;
};

// B
const bottomRight = function (currentArr) {
  let upperArr = [currentArr[2][0], currentArr[2][1], currentArr[2][2]];
  upperArr.unshift(upperArr.pop());
  for (let i = 0; i < currentArr.length; i++) {
    currentArr[2][i] = upperArr[i];
  }
  newCube = currentArr;
  getCube(currentArr, $containerBox);
  return newCube;
};

// B'
const bottomLeft = function (currentArr) {
  let upperArr = [currentArr[2][0], currentArr[2][1], currentArr[2][2]];
  upperArr.push(upperArr.shift());
  for (let i = 0; i < currentArr.length; i++) {
    currentArr[2][i] = upperArr[i];
  }
  newCube = currentArr;
  getCube(currentArr, $containerBox);
  return newCube;
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
// (singleQuote 정리)
// 공백제거
// 문자열 유효한지 검사
const valueCheck = function (value) {
  let checkValue = true;
  let valueArr = value.split('');
  let upperValueArr = valueArr.map((e) => e.toUpperCase());
  let noSpaceArr = delSpace(upperValueArr);
  spaceCheck(noSpaceArr);
  checkSingleQuote(noSpaceArr);
  let noSingleQuoteArr = delSingleQuote(noSpaceArr);
  stringCheck(noSingleQuoteArr);
  if (checkValue) {
    return noSingleQuoteArr;
  } else if (!checkValue) {
    return checkValue;
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
  function spaceCheck(value) {
    if (value.length === 0) {
      alert('값을 입력해주세요.(빈칸입니다.)');
      $inputBox.focus();
      checkValue = false;
      return checkValue;
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
      resetFocus();
      checkValue = false;
      return checkValue;
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
  function stringCheck(value) {
    let count = 0;
    for (let i = 0; i < value.length; i++) {
      if (!stringSet.includes(value[i])) {
        count++;
      }
    }
    if (count !== 0) {
      alert("알 수 없는 입력값이 있습니다.\n(유효한 입력값: U, U', R, R', L, L', B, B', Q)");
      resetFocus();
      checkValue = false;
      return checkValue;
    }
  }
};

// movePart
const findingMove = function () {
  let command = getInputValue();
  if (command === false) {
    return;
  }
  for (let i = 0; i < command.length; i++) {
    for (let j = 0; j < stringSet.length; j++) {
      if (command[i] === stringSet[j]) {
        getCommandViewBox(command[i]);
        movingCube(command[i]);
      }
    }
  }
  resetFocus();
};

const movingCube = function (value) {
  switch (value) {
    case stringSet[0]:
      upperLeft(newCube);
      break;
    case stringSet[1]:
      upperRight(newCube);
      break;
    case stringSet[2]:
      rightUp(newCube);
      break;
    case stringSet[3]:
      rightDown(newCube);
      break;
    case stringSet[4]:
      leftDown(newCube);
      break;
    case stringSet[5]:
      leftUp(newCube);
      break;
    case stringSet[6]:
      bottomRight(newCube);
      break;
    case stringSet[7]:
      bottomLeft(newCube);
      break;
    case stringSet[8]:
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
