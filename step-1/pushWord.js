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

  const checkNumber = (num) => (num > 0 ? PLUS : MINUS);

  let unifiedDirection = dir.toUpperCase();
  let checkedNumber = checkNumber(num);
  let absNumber = Math.abs(num);
  let lastDirection = getDirection(unifiedDirection, checkedNumber);
  let lastWord = pushWord(txt, lastDirection, absNumber);
  return ($resultBox.value = lastWord.join(''));
};

const inputCheck = function (txt, dir, num) {
  console.log(txt, dir, num);
  const spaceCheck = function (txt, dir, num) {
    if (txt === '') {
      alert('빈칸을 입력해주세요.');
      moveFocus($inputWord);
    } else if (dir === '') {
      alert('빈칸을 입력해주세요.');
      moveFocus($inputDirection);
    } else if (num === '') {
      alert('빈칸을 입력해주세요.');
      moveFocus($inputNumber);
    }
  };
  const directionCheck = function (dir) {
    if (dir !== 'L' && dir !== 'l' && dir !== 'R' && dir !== 'r' && dir.length !== 0) {
      alert('L 또는 R 만 입력해주세요. (소문자는 가능해요)');
      moveFocus($inputDirection);
      resetValue($inputDirection);
    }
  };
  const numberCheck = function (num) {
    if (num < -100 || num > 100) {
      alert('-100보다 크거나 같고, 100보다 작은 수를 입력해주세요.');
    }
  };
  spaceCheck(txt, dir, num);
  directionCheck(dir);
  numberCheck(num);
};

const getDirection = function (dir, num) {
  let lastDirection;
  if ((dir === LEFT && num === PLUS) || (dir === RIGHT && num === MINUS)) {
    lastDirection = LEFT;
  } else if ((dir === LEFT && num === MINUS) || (dir === RIGHT && num === PLUS)) {
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
