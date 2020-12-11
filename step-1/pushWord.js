const $inputWord = document.querySelector('#step-1-input-word');
const $inputDirection = document.querySelector('#step-1-input-direction');
const $inputNumber = document.querySelector('#step-1-input-number');
const $resultBox = document.querySelector('#step-1-input-result');
const LEFT = 'L';
const RIGHT = 'R';
const PLUS = 'plus';
const MINUS = 'minus';
const ALERT = '빈칸을 입력해주세요.';

const operate = function (txt, dir, num) {
  inputCheck(txt, dir, num);

  let unifiedDirection = dir.toUpperCase();
  let absNumber = Math.abs(num);
  let lastDirection = getDirection(unifiedDirection, num);
  let lastWord = pushWord(txt, lastDirection, absNumber);
  return ($resultBox.value = lastWord.join(''));
};

const inputCheck = function (txt, dir, num) {
  console.log(txt, dir, num);
  const spaceCheck = function (txt, dir, num) {
    if (txt === '') {
      alert(ALERT);
      moveFocus($inputWord);
    } else if (dir === '') {
      alert(ALERT);
      moveFocus($inputDirection);
    } else if (num === '') {
      alert(ALERT);
      moveFocus($inputNumber);
    }
  };
  const directionCheck = function (dir) {
    if (dir !== 'L' && dir !== 'l' && dir !== 'R' && dir !== 'r' && dir.length !== 0) {
      alert('L 또는 R 만 입력해주세요. (소문자도 가능해요)');
      moveFocus($inputDirection);
      resetValue($inputDirection);
    }
  };
  const numberCheck = function (num) {
    if (isNaN(num)) {
      alert('숫자를 입력해주세요.');
    } else if (Number(num) !== parseInt(num)) {
      alert('정수로 입력해주세요.');
    } else if (num.length > 16) {
      alert('정수로 입력해주세요.');
    } else if (num < -100 || num > 100) {
      alert('-100보다 크거나 같고, 100보다 작은 수를 입력해주세요.');
    }
    moveFocus($inputNumber);
    resetValue($inputNumber);
  };
  spaceCheck(txt, dir, num);
  directionCheck(dir);
  numberCheck(num);
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
