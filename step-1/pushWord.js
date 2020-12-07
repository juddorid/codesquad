const inputWord = 'apple';

// L or R
// Upper or Lowwer
const direction = 'L';

// -100 <= N < 100
const inputNumber = 3;
let wordArr = inputWord.split('');
const UnifyText = (txt) => txt.toUpperCase();
const checkNumber = (num) => (num > 0 ? 'plus' : 'minus');
const checkedNumber = checkNumber(inputNumber);
const checkDirection = function (txt, num) {};
const goLeft = (arr) => arr.push(arr.shift());
const goRight = (arr) => arr.unshift(arr.pop());
