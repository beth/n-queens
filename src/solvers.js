/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme
  /**
  var placeNext = function(currentBoard, leftToPlace) {
    if (leftToPlace === 0 && !currentBoard.hasAnyRooksConflicts()) {
      solution = currentBoard.rows();
      console.log(solution);
    } else if (leftToPlace > 0 && !currentBoard.hasAnyRooksConflicts()) {
      for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
          var board = new Board(currentBoard.rows());
          if(!(board.get(i)[j])){
            board.togglePiece(i, j);
            if (!board.hasAnyRooksConflicts()) {
              placeNext(board, leftToPlace - 1);
            } else {
              board.togglePiece(i, j);
            }
            // if there's a rook conflict with the newly set piece (and all previously set ones)
              // toggle that new piece back off
          }
        }
      }
    }
  };*/
  var count =0;
  var placeNext = function(currentBoard,leftToPlace,row,col){
    if(!(currentBoard.get(row)[col])){
      currentBoard.togglePiece(row,col);
      leftToPlace--;
      if(leftToPlace===0 && !currentBoard.hasAnyRooksConflicts())
      {
        solution = currentBoard.rows();
        count++;
      }else if(!currentBoard.hasAnyRooksConflicts()){
        for(var i =0;i<n;i++){
          for(var j=0;j<n;j++){
            placeNext(new Board(currentBoard.rows()),leftToPlace,i,j);
          }
        }
      }else{
        currentBoard.togglePiece(row,col);
      }
    }
  };

  //placeNext(new Board({n:n}), n);
  for(var i =0;i<n;i++){
    for(var j =0; j<n;j++){
      placeNext(new Board({n:n}),n,i,j);
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  console.log('solutions found:' + count);
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
