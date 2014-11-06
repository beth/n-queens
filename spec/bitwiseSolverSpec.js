describe('solvers', function() {
  window.displayBoard = function() {};

  describe('bitwiseRookSolver()', function() {

    it('finds the number of valid solutions for n of 1-8', function() {
      _.range(1, 9).map(function(n) {
        var solutionCount = bitwiseRookSolver(n);
        var expectedSolutionCount = [1, 1, 2, 6, 24, 120, 720, 5040, 40320][n];

        expect(solutionCount).to.be.equal(expectedSolutionCount);
      });
    });

  });
  describe('bitwiseQueenSolver()', function() {

    it('finds the number of valid solutions for n of 0-8', function() {
      _.range(0, 9).map(function(n) {
        var solutionCount = bitwiseQueenSolver(n);
        var expectedSolutionCount = [1, 1, 0, 0, 2, 10, 4, 40, 92][n];

        expect(solutionCount).to.be.equal(expectedSolutionCount);
      });
    });

  });

});
