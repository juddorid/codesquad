const $inputWord = document.querySelector('#step-1-input-word');
const $inputDirection = document.querySelector('#step-1-input-direction');
const $inputNumber = document.querySelector('#step-1-input-number');
const $resultBox = document.querySelector('#step-1-input-result');
const LEFT = 'L';
const RIGHT = 'R';
const PLUS = 'plus';
const MINUS = 'minus';

const operate = function (txt, dir, num) {
  inputCheck(txt, dir, num);

  let unifiedDirection = dir.toUpperCase();
  let absNumber = Math.abs(num);
  let lastDirection = getDirection(unifiedDirection, num);
  let lastWord = pushWord(txt, lastDirection, absNumber);
  return ($resultBox.value = lastWord.join(''));
};

const inputCheck = function (txt, dir, num) {
  const SPACE_ALERT = '빈칸을 입력해주세요.';
  const DIR_ALERT = 'L 또는 R 만 입력해주세요. (소문자도 가능해요)';
  const NUM_ALERT = {
    notNum: '숫자를 입력해주세요.',
    notInt: '정수로 입력해주세요.',
    wrongSize: '-100보다 크거나 같고, 100보다 작은 수를 입력해주세요.',
  };

  if (spaceCheck(txt, dir, num)) {
    alert(SPACE_ALERT);
  } else if (directionCheck(dir)) {
    alert(DIR_ALERT);
    resetValue($inputDirection);
  } else if (numberCheck(num)) {
    moveFocus($inputNumber);
    resetValue($inputNumber);
  }
  console.log(txt, dir, num);
  function spaceCheck(txt, dir, num) {
    if (txt === '') {
      moveFocus($inputWord);
      return SPACE_ALERT;
    } else if (dir === '') {
      moveFocus($inputDirection);
      return SPACE_ALERT;
    } else if (num === '') {
      moveFocus($inputNumber);
      return SPACE_ALERT;
    }
  }
  function directionCheck(dir) {
    if (dir !== 'L' && dir !== 'l' && dir !== 'R' && dir !== 'r' && dir.length !== 0) {
      moveFocus($inputDirection);
      return DIR_ALERT;
    }
  }
  function numberCheck(num) {
    if (isNaN(num)) {
      return NUM_ALERT.notNum;
    } else if (Number(num) !== parseInt(num)) {
      return NUM_ALERT.notInt;
    } else if (num.length > 16) {
      return NUM_ALERT.notInt;
    } else if (num < -100 || num > 100) {
      return NUM_ALERT.wrongSize;
    }
  }
};

const getDirection = function (dir, num) {
  const checkNumber = (num) => (num > 0 ? PLUS : MINUS);
  let checkedNumber = checkNumber(num);
  let lastDirection;
  if ((dir === LEFT && checkedNumber === PLUS) || (dir === RIGHT && checkedNumber === MINUS)) {
    lastDirection = LEFT;
  } else if ((dir === LEFT && checkedNumber === MINUS) || (dir === RIGHT && checkedNumber === PLUS)) {
    lastDirection = RIGHT;
  }
  return lastDirection;
};

const pushWord = function (txt, dir, num) {
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
};

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
