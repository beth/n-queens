//genetic algorithm 
//1. generate solutions
//2. evaluate solutions
//3. Fitness based selection
//4. Mutation
//5. Crossover


var genotype = function(n){
  this.n = n;
  this.numberSquares = Math.pow(n,2);
  this.solution = padWithZeros((Math.ceil(Math.random()*Math.pow(2,numberSquares))).toString(2),numberSquares).split("");
  this.board;
  this.score;
}

genotype.prototype.makeBoard = function(){

  var board = [];
  for(var i =0;i<this.n;i++){
  var row = [];
    for(var j=0;j<this.n;j++){
      row.push(parseInt(this.solution[i*n+j],10));
    }
  board.push(row);
  }
  this.board = new Board(board);
}


//Parameters
var n = 5;
var numberSquares = Math.pow(n,2);

var padWithZeros = function(string,n){
  var pad = "";
  for(var i = 0;i<(n-string.length);i++){
    pad += "0";
  }
  return pad + string;
}

//Generate Solutions
var solution = padWithZeros((Math.ceil(Math.random()*Math.pow(2,numberSquares))).toString(2),numberSquares).split("");
var makeBoard = function(solution,n){
  var board = [];
  for(var i =0;i<n;i++){
  var row = [];
    for(var j=0;j<n;j++){
      row.push(parseInt(solution[i*n+j],10));
    }
  board.push(row);
  }
  return board;
}

var setUp = makeBoard(solution,n);
var board = new Board(setUp);

//Scoring 
var conflicts = 0;
for(var i = 0;i<n;i++){
  if(board.hasRowConflictAt(i)){
    conflicts++;
  }
  if(board.hasColConflictAt(i)){
    conflicts++;
  }
  if(board.hasMajorDiagonalConflictAt(i)){
    conflicts++;
  }
  if(board.hasMinorDiagonalConflictAt(i)){
    conflicts++;
  }
}

for(var i = -n;i<0;i++){
  if(board.hasMinorDiagonalConflictAt(i)){
    conflicts++;    
  }
}
for(var i = n;i<(2*n-1);i++){
  if(board.hasMajorDiagonalConflictAt(i)){
    conflicts++;
  }
}
 var queens = 0;

var boardRows = board.rows();
for(var i = 0; i<n;i++){
  for(var j =0; j<n;j++){
    queens += boardRows[i][j];
  }
}



var score = -1*Math.pow((n-queens),2) - conflicts;
