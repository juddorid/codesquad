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
let myCube = [
  ['R', 'R', 'W'],
  ['G', 'C', 'W'],
  ['G', 'B', 'B'],
];
const stringList = ['U', "U'", 'R', "R'", 'L', "L'", 'B', "B'", 'Q'];
const $containerBox = document.querySelector('#container_box');
const $inputButton = document.querySelector('#input_btn');
const $inputBox = document.querySelector('body > div > div.input_container > input.input_box');
const WRAPPER = 'wrapper';
const COLORBOX = 'color_box';
const COMMAND_BOX = 'command_box';
let oneWayCube = getCubeArray(myCube);

getCube(myCube, $containerBox);

function getCubeArray(cube) {
  let cubeArray = [];
  for (let i = 0; i < cube.length; i++) {
    for (let j = 0; j < cube.length; j++) {
      cubeArray.push(cube[i][j]);
    }
  }
  return cubeArray;
}
function getCube(cube, containerBox) {
  function createCubeDOM() {
    const BOXSIZE = 9;
    let wrapper = createDIV(WRAPPER);
    for (let i = 0; i < BOXSIZE; i++) {
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
}

function createDIV(className) {
  let tempDiv = document.createElement('div');
  tempDiv.className = className;
  return tempDiv;
}

const getCommandViewBox = function (command) {
  let box = createDIV(COMMAND_BOX);
  $containerBox.append(box);
  box.innerText = command;
};

const getXY = function (i) {
  return {
    U: { X: 0, Y: i },
    R: { X: i, Y: 2 },
    L: { X: i, Y: 0 },
    B: { X: 2, Y: i },
  };
};

function getLineArr(arr, loc) {
  let lineArr = [];
  for (let i = 0; i < 3; i++) {
    let XY = getXY(i)[loc];
    lineArr.push(arr[XY.X][XY.Y]);
  }
  return lineArr;
}

function linePush(arr, i) {
  const goClock = (arr) => {
    arr.push(arr.shift());
    return arr;
  };
  const goUnClock = (arr) => {
    arr.unshift(arr.pop());
    return arr;
  };
  let rotateArr = i % 2 === 0 ? goClock(arr) : goUnClock(arr);
  return rotateArr;
}

const rotateCube = function (arr, loc, dir) {
  let moveArr = getLineArr(arr, loc);
  let pushedLine = linePush(moveArr, dir);
  for (let i = 0; i < arr.length; i++) {
    let XY = getXY(i)[loc];
    arr[XY.X][XY.Y] = pushedLine[i];
  }
  getCube(arr, $containerBox);
  return arr;
};

// Q
const quitBye = function () {
  $inputBox.value = 'BYE~!';
  $inputBox.disabled = true;
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
function valueCheck(value) {
  const SPACE_ALERT = '값을 입력해주세요.(빈칸입니다.)';
  const SINGLE_QUOTE = '잘못된 입력입니다.(sigleQuote연속)';
  const UNKNOWN_VALUE = "알 수 없는 입력값이 있습니다.\n(유효한 입력값: U, U', R, R', L, L', B, B', Q)";

  let checkValue = true;

  let valueArr = value.split('');
  let upperValueArr = valueArr.map((e) => e.toUpperCase());
  let noSpaceArr = deleteWhiteSpace(upperValueArr);
  spaceCheck(noSpaceArr);
  checkSingleQuote(noSpaceArr);
  let noSingleQuoteArr = delSingleQuote(noSpaceArr);
  stringCheck(noSingleQuoteArr);

  if (checkValue) {
    return noSingleQuoteArr;
  } else if (!checkValue) {
    return checkValue;
  }

  function deleteWhiteSpace(value) {
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
      alert(SPACE_ALERT);
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
      alert(SINGLE_QUOTE);
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
      if (!stringList.includes(value[i])) {
        count++;
      }
    }
    if (count !== 0) {
      alert(UNKNOWN_VALUE);
      resetFocus();
      checkValue = false;
      return checkValue;
    }
  }
}

// movePart
function findingMove() {
  let command = getInputValue();
  if (!command) {
    return;
  }
  operate(command);
}

function operate(cmd) {
  for (let i = 0; i < cmd.length; i++) {
    getCommandViewBox(cmd[i]);
    movingCube(cmd[i]);
  }
}

const movingCube = function (value) {
  let idx = stringList.indexOf(value);
  if (idx < 2) {
    rotateCube(myCube, 'U', idx);
  } else if (idx < 4) {
    rotateCube(myCube, 'R', idx);
  } else if (idx < 6) {
    rotateCube(myCube, 'L', idx);
  } else if (idx < 8) {
    rotateCube(myCube, 'B', idx);
  } else if (idx === 8) {
    quitBye();
  }
};

// reset
const resetFocus = function () {
  $inputBox.value = '';
  $inputBox.focus();
};
