/*BITWISE NOTES

count = 0, all = string of n 1s
ld, rd, col = string of 0s, length n
possibilities = ~(ld | col | rd)

recursive function(ld,col,rd){
  if(col === all){
    count++;
  }else{
    possibilities = ~(ld | col | rd)
    while(possibilities has at least a 1){
      (-possibilities = take inverse of possibilities, add 1)
      choice = possibilities & -possibilities
      remove choice from possibilities
      recursive function((ld|choice)<<1, cols|choice, rd|bit>>1));
    }
  }
}

recursiveFunction(0,0,0);*/

var bitwiseQueenSolver = function(n) {
  var startTime = Date.now();
  var count = 0;
  var all = Math.pow(2, n) - 1;

  var recurse = function(ld, col, rd) {
    if (col === all) {
      count++;
    } else {
      var poss = ~(ld | col | rd) & all;
      while(poss) {
        var choice = poss & -poss;
        poss -= choice;
        recurse((ld | choice)<<1, col | choice, (rd | choice)>>>1)
      }
    }
  }

  recurse(0, 0, 0);
  console.log('Bitwise runtime for ' + n + ' queens is:' + (Date.now()-startTime) + 'ms')
  return count;
}
