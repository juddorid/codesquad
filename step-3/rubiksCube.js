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

// init
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

// let key = 'FLRDUB';
// let keyArr = key.split('');

function getKey(value) {
  let mykeyMap = {
    F: { F: 'F', U: 'U', D: 'D', L: 'L', R: 'R' },
    L: { F: 'L', U: 'U-90', D: 'D+90', L: 'B', R: 'F' },
    R: { F: 'R', U: 'U+90', D: 'D-90', L: 'F', R: 'B' },
    B: { F: 'B', U: 'U180', D: 'D180', L: 'R', R: 'L' },
    U: { F: 'U', U: 'B180', D: 'F', L: 'L+90', R: 'R-90' },
    D: { F: 'D', U: 'F', D: 'B180', L: 'L-90', R: 'R+90' },
  };

  key = mykeyMap.get(value);
  keyArr = key.split('');
  return keyArr;
}

// 회전된 배열 필요

function rotate90(cube) {
  let newArr = JSON.parse(JSON.stringify(cube));
  for (let i = 0; i < cube.length; i++) {
    for (let j = 0; j < cube.length; j++) {
      newArr[i][j] = cube[cube.length - j - 1][i];
    }
  }
  return newArr;
}

let mykeyMap = {
  F: { F: rubiksCube[2], U: rubiksCube[0], D: rubiksCube[5], L: rubiksCube[1], R: rubiksCube[3] },
  L: { F: rubiksCube[1], U: 'U-90', D: 'D+90', L: rubiksCube[4], R: rubiksCube[2] },
  R: { F: rubiksCube[3], U: 'U+90', D: 'D-90', L: rubiksCube[2], R: rubiksCube[4] },
  B: { F: rubiksCube[4], U: 'U180', D: 'D180', L: rubiksCube[3], R: rubiksCube[1] },
  U: { F: rubiksCube[0], U: 'B180', D: rubiksCube[2], L: 'L+90', R: 'R-90' },
  D: { F: rubiksCube[5], U: rubiksCube[2], D: 'B180', L: 'L-90', R: 'R+90' },
};

// 입력받은 value를 getKey에 넣어주면, myCube에 value기준으로 큐브를 다시 세팅
let currentKey = getKey('D');
let myCube = changeMapValue(currentKey);

// 상대값으로 위치를 다시 명명해주면?
// 처음에는 F가 F인데, R을 돌려! 하면 R이 F인거야
// 그러면 R을 F라고 하고, 각자가 위치를 다시 생각한다
// 명령에 따라 큐브의 정면이 바뀐다
// 큐브 자체가 돌아가는 설정
// F: fornt // L: left // R: right // D: down // U: up // B: back

// 기준면을 바꾸면 큐브를 돌리는 것과 같다
// 기준면을 바꾸려면 기준면이 바뀌는 것에 따라 모든 면을 회전시켜줘야 한다
// 옆으로 돌리면 위, 아래가 돌아간다
// 단순히 면을 바꿔주는게 아니라.. 밀어내기를 하는게 맞을 수도 있을 것 같다

// 다시 정리하자면,
// 반대쪽면은 제외할 수 있다
// 기준면을 기준으로 상하좌우만 생각하면 된다
// 놓쳤던 점은 기준면을 바꿀 때, 관계된 면들이 회전하는 것
/////////////////////////////////////////////////////////////////////////
// F(standard) => U D L R
// L => U: U -90 / D: D 90 / L: B / R: F
// R => U: U 90 / D: D -90 / L: F / R: B
// B => U: U 180 / D: D 180 / L: R / R: L
// U => U: B 180 / D: F / L: L 90 / R: R -90
// D => U: F / D: B 180 / L: L -90 / R: R 90
/////////////////////////////////////////////////////////////////////////

// rotate right
function rotateA(cube) {
  rotate(cube);
  addCube();
}

// rotate left
function rotateB(cube) {
  rotate(cube);
  rotate(cube);
  rotate(cube);
  addCube();
}

function rotate(cube) {
  function rotate90(cube) {
    // array 90도 회전시키기
    // 정면 90도 회전
    let standard = cube.get('F');
    let newArr = JSON.parse(JSON.stringify(cube));
    for (let i = 0; i < cube.length; i++) {
      for (let j = 0; j < cube.length; j++) {
        newArr[i][j] = cube[cube.length - j - 1][i];
      }
    }
    return newArr;
  }
  // 한쪽면 값 먼저 get
  function fix(right) {
    let fix = [right[0][0], right[1][0], right[2][0]];
    return fix;
  }
  // 기준면의 주변면의 회전 루틴
  // T_bottom => R_elft => B_top => L_right => T_bottom
  function upToRight(up, right) {
    right[0][0] = up[2][0];
    right[1][0] = up[2][1];
    right[2][0] = up[2][2];
    return right;
  }

  function leftToUp(left, up) {
    up[2][0] = left[2][2];
    up[2][1] = left[1][2];
    up[2][2] = left[0][2];
    return up;
  }

  function downToLeft(down, left) {
    left[0][2] = down[0][0];
    left[1][2] = down[0][1];
    left[2][2] = down[0][2];
    return left;
  }

  function rightToDown(fix, down) {
    down[0][0] = fix[0];
    down[0][1] = fix[1];
    down[0][2] = fix[2];
    return fix;
  }
  let cubeUp = cube.get('U');
  let cubeRight = cube.get('R');
  let cubeLeft = cube.get('L');
  let cubeDown = cube.get('D');

  // operating
  let fixed = fix(cubeRight);
  rotateClockWise(cube);
  upToRight(cubeUp, cubeRight);
  leftToUp(cubeLeft, cubeUp);
  downToLeft(cubeDown, cubeLeft);
  rightToDown(fixed, cubeDown);
  return rubiksCube;
}
