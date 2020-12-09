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
  let mykeyMap = new Map();
  mykeyMap.set('F', 'FUDLR');
  mykeyMap.set('L', 'LteBF');
  mykeyMap.set('R', 'RvcFB');
  mykeyMap.set('B', 'BNSRL');
  mykeyMap.set('U', 'UTFmq');
  mykeyMap.set('D', 'DFTks');

  key = mykeyMap.get(value);
  keyArr = key.split('');
  return keyArr;
}

let cmdMap = new Map();
cmdMap.set('F', rubiksCube[2]);
cmdMap.set('L', rubiksCube[1]);
cmdMap.set('R', rubiksCube[3]);
cmdMap.set('B', rubiksCube[4]);
cmdMap.set('U', rubiksCube[0]);
cmdMap.set('D', rubiksCube[5]);

// 회전된 배열 필요
// U-90 = t / U90 = v / U180 = N / D-90 = c / D90 = e / D180 = S / B180 = T / L-90 = k / L90 = m / R-90 = q / R90 = s
cmdMap.set('t');
cmdMap.set('v');
cmdMap.set('c');
cmdMap.set('e');
cmdMap.set('N');
cmdMap.set('S');
cmdMap.set('T');
cmdMap.set('k');
cmdMap.set('m');
cmdMap.set('q');
cmdMap.set('s');

function changeMapValue(key) {
  let myCube = new Map();
  myCube.set('F', cmdMap.get(key[0]));
  myCube.set('U', cmdMap.get(key[1]));
  myCube.set('D', cmdMap.get(key[2]));
  myCube.set('L', cmdMap.get(key[3]));
  myCube.set('R', cmdMap.get(key[4]));
  return myCube;
}

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
  function rotateClockWise(cube) {
    function planeSample() {
      let num = 1;
      let test = [];
      for (let i = 0; i < 3; i++) {
        let temp = [];
        for (let j = 0; j < 3; j++) {
          temp.push(num);
          num++;
        }
        test.push(temp);
      }
      return test;
    }
    // array 90도 회전시키기
    // 정면 90도 회전
    let rotateArr = planeSample();
    let standard = cube.get('F');
    rotateArr[0][0] = standard[2][0];
    rotateArr[0][1] = standard[1][0];
    rotateArr[0][2] = standard[0][0];
    rotateArr[1][0] = standard[2][1];
    rotateArr[1][2] = standard[0][1];
    rotateArr[2][0] = standard[2][2];
    rotateArr[2][1] = standard[1][2];
    rotateArr[2][2] = standard[0][2];
    return rotateArr;
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
