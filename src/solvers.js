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

window.deepCopyMatrix = function(array){
  var result = [];
  for(var i = 0; i<array.length;i++){
    var intermediate = [];
    for(var j = 0; j<array[i].length;j++){
      intermediate.push(array[i][j]);
    }
    result.push(intermediate);
  }
  return result;
};

window.findNRooksSolution = function(n) {
  var board = new Board({n:n});
  var result;
  var found = false;

  var recursivePlacement = function(rowToPlace){
    if(!found) {
      if(rowToPlace === n){
        result =(deepCopyMatrix(board.rows()));
        found = true;
      }else{
        for(var c = 0; c<n;c++){
          board.togglePiece(rowToPlace,c);
          if(board.hasAnyRooksConflicts()){
            board.togglePiece(rowToPlace,c);
          }else{
            recursivePlacement(rowToPlace+1);
            board.togglePiece(rowToPlace,c);
          }
        }
      }
    }
  };

  recursivePlacement(0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(result));
  return result;
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n:n});

  var recursivePlacement = function(rowToPlace){
    if(rowToPlace === n){
      solutionCount++;
    }else{
      for(var c = 0; c<n;c++){
        board.togglePiece(rowToPlace,c);
        if(board.hasAnyRooksConflicts()){
          board.togglePiece(rowToPlace,c);
        }else{
          recursivePlacement(rowToPlace+1);
          board.togglePiece(rowToPlace,c);
        }
      }
    }
  };

  recursivePlacement(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n:n});
  var result;
  var found = false;

  var recursivePlacement = function(rowToPlace){
    if (!found) {
      if(rowToPlace === n){
        result = (deepCopyMatrix(board.rows()));
        found = true;
      }else{
        for(var c = 0; c<n;c++){
          board.togglePiece(rowToPlace,c);
          if(board.hasAnyQueensConflicts()){
            board.togglePiece(rowToPlace,c);
          }else{
            recursivePlacement(rowToPlace+1);
            board.togglePiece(rowToPlace,c);
          }
        }
      }
    }
  };

  recursivePlacement(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(result));
  return result;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});

  var recursivePlacement = function(rowToPlace){
    if(rowToPlace === n){
      solutionCount++;
    }else{
      for(var c = 0; c<n;c++){
        board.togglePiece(rowToPlace,c);
        if(board.hasAnyQueensConflicts()){
          board.togglePiece(rowToPlace,c);
        }else{
          recursivePlacement(rowToPlace+1);
          board.togglePiece(rowToPlace,c);
        }
      }
    }
  };

  recursivePlacement(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
