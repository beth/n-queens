window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme
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
  };
  var count =0;
  var placeNext = function(currentBoard,leftToPlace,row,col){
    if(!(currentBoard.get(row)[col])){
      currentBoard.togglePiece(row,col);
      leftToPlace--;
      if(leftToPlace===0 && !currentBoard.hasAnyRooksConflicts())
      {
        solution = currentBoard.rows();
        if(n===2){
          console.log(JSON.stringify(solution));
        }

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
  };
};
