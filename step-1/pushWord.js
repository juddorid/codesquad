const $inputWord = document.querySelector('#step-1-input-word');
const $inputDirection = document.querySelector('#step-1-input-direction');
const $inputNumber = document.querySelector('#step-1-input-number');
const $resultBox = document.querySelector('#step-1-input-result');
const LEFT = 'L';
const RIGHT = 'R';

function goCheck() {
  let checkedValue = inputCheck();
  if (!checkedValue) {
    return;
  }
  operate($inputWord.value, $inputDirection.value, $inputNumber.value);
}

function operate(txt, dir, num) {
  let unifiedDirection = dir.toUpperCase();
  let absNumber = Math.abs(num);
  let lastDirection = getDirection(unifiedDirection, num);
  let lastWord = pushWord(txt, lastDirection, absNumber);
  $resultBox.value = lastWord.join('');
}

function inputCheck() {
  const SPACE_ALERT = '빈칸을 입력해주세요.';
  const DIR_ALERT = 'L 또는 R 만 입력해주세요. (소문자도 가능해요)';
  const NUM_ALERT = {
    notNum: '숫자를 입력해주세요.',
    notInt: '정수로 입력해주세요.',
    wrongSize: '-100보다 크거나 같고, 100보다 작은 수를 입력해주세요.',
  };

  if (inputSpaceCheck()) {
    alert(SPACE_ALERT);
    return false;
  }

  if (inputDirCheck()) {
    alert(DIR_ALERT);
    resetValue($inputDirection);
    return false;
  }

  if (inputNumCheck()) {
    alert(inputNumCheck());
    moveFocus($inputNumber);
    resetValue($inputNumber);
    return false;
  }

  function inputSpaceCheck() {
    const spaceCheck = (box) => box.value === '';
    if (spaceCheck($inputWord)) {
      moveFocus($inputWord);
      return true;
    }
    if (spaceCheck($inputDirection)) {
      moveFocus($inputDirection);
      return true;
    }
    if (spaceCheck($inputNumber)) {
      moveFocus($inputNumber);
      return true;
    }
    return false;
  }

  function inputDirCheck() {
    const dirCheck = (box) => box.value.toUpperCase() !== LEFT && box.value.toUpperCase() !== RIGHT;
    if (dirCheck($inputDirection)) {
      moveFocus($inputDirection);
      return true;
    }
  }

  function inputNumCheck() {
    const isNaNCheck = (box) => isNaN(box.value);
    const intCheck = (box) => Number(box.value) !== parseInt(box.value);
    const floorCheck = (box) => box.value.length > 16;
    const sizeCheck = (box) => box.value < -100 || box.value > 100;

    if (isNaNCheck($inputNumber)) return NUM_ALERT.notNum;
    if (intCheck($inputNumber) || floorCheck($inputNumber)) return NUM_ALERT.notInt;
    if (sizeCheck($inputNumber)) return NUM_ALERT.wrongSize;
  }
  return true;
}

function getDirection(dir, num) {
  const PLUS = 'plus';
  const MINUS = 'minus';
  const checkNumber = (num) => (num > 0 ? PLUS : MINUS);
  let checkedNumber = checkNumber(num);
  let lastDirection;
  if ((dir === LEFT && checkedNumber === PLUS) || (dir === RIGHT && checkedNumber === MINUS)) {
    lastDirection = LEFT;
  } else if ((dir === LEFT && checkedNumber === MINUS) || (dir === RIGHT && checkedNumber === PLUS)) {
    lastDirection = RIGHT;
  }
  return lastDirection;
}

function pushWord(txt, dir, num) {
  const goLeft = (arr) => arr.push(arr.shift());
  const goRight = (arr) => arr.unshift(arr.pop());
  let wordArr = txt.split('');
  for (let i = 0; i < num; i++) {
    if (dir === LEFT) {
      goLeft(wordArr);
    } else if (dir === RIGHT) {
      goRight(wordArr);
    }
  }
  return wordArr;
}

// auto tab
function autoTab(current, next) {
  if (current.value.length === 1) {
    moveFocus(next);
  }
}

// move focus
function moveFocus(next) {
  next.focus();
}

// reset value
function resetValue(data) {
  let resetData = (data.value = '');
  return resetData;
}

function resetAll() {
  $inputWord.value = '';
  $inputDirection.value = '';
  $inputNumber.value = '';
  $resultBox.value = '';
  moveFocus($inputWord);
}
