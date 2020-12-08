const RUBIKS = 3;

const getRubiksCube = function (color) {
  let rubiks = [];
  for (let i = 0; i < RUBIKS; i++) {
    let temp = [];
    for (let j = 0; j < RUBIKS; j++) {
      temp.push(color);
    }
    rubiks.push(temp);
  }
  return rubiks;
};

console.log(getRubiksCube('B'));
