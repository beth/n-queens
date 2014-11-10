//genetic algorithm 
//1. generate solutions
//2. evaluate solutions
//3. Fitness based selection
//4. Mutation
//5. Crossover


var genotype = function(n,solution){
  this.n = n;
  this.numberSquares = Math.pow(n,2);
  this.solution = solution || padWithZeros((Math.ceil(Math.random()*Math.pow(2,this.numberSquares))).toString(2),this.numberSquares).split("");
  this.board = undefined;
  this.score = undefined;
  this.maxScore = Math.pow(n*n-n,2) + Math.pow(n*2,2);
}

genotype.prototype.makeBoard = function(){
  var board = [];
  for(var i =0;i<this.n;i++){
  var row = [];
    for(var j=0;j<this.n;j++){
      row.push(parseInt(this.solution[i*this.n+j],10));
    }
  board.push(row);
  }
  this.board = new Board(board);
};

genotype.prototype.computeScore = function(){
  var conflicts = 0;
  for(var i = 0;i<this.n;i++){
    if(this.board.hasRowConflictAt(i)){
      conflicts++;
    }
    if(this.board.hasColConflictAt(i)){
      conflicts++;
    }
  }

  var queens = 0;

  var boardRows = this.board.rows();
  for(var i = 0; i<this.n;i++){
    for(var j =0; j<this.n;j++){
      queens += boardRows[i][j];
    }
  }
  

  this.score = this.maxScore - Math.pow((this.n-queens),2) - Math.pow(conflicts,2);
  //console.log(maxScore + "conflicts" + conflicts + "queens" + queens+"score"+this.score);
};

var padWithZeros = function(string,n){
  var pad = "";
  for(var i = 0;i<(n-string.length);i++){
    pad += "0";
  }
  return pad + string;
}

var n = 3;

var Population = function(num){
  this.array = [];
  this.num = num;
  this.generation = 0;
  this.generationFitness;
}

Population.prototype.initializePopulation = function(){
  for(var i = 0; i<this.num; i++){
    var sol = new genotype(n);
    sol.makeBoard();
    sol.computeScore();
    this.array.push(sol);
  }
};

var findIndex = function(val,arr){
  for(i in arr){
    if(val<arr[i])
      return i;
  }
  return arr.length-1;
};

Population.prototype.reproduce = function(){

  //Fitness based selection
  //Compute total fitness of generation
  var tot = _.reduce(this.array,function(memo,val){
    return memo + val.score;
  },0);
  //Create break points for each 

  var sum = 0;
  var reproBreaks = _.map(this.array,function(geno){
    sum += geno.score;
    return sum/tot;
  });
  //Do fitness based selection
  var newArray = [];
  for(var i = 0;i<this.num;i++){
    var index = findIndex(Math.random(),reproBreaks);
    var copyOf = this.array[index].solution.slice();
    newArray.push(new genotype(n,copyOf));
  }

  this.array = newArray;
  //mutation
  var mutationRate = 0.05;
  var crossOverRate;
  if(this.generation<500){
    var crossOverRate = 0.1;
  }else
    crossOverRate = 0.05


  for(var i = 0; i<this.num;i++){
    var sol = this.array[i].solution;
    for(k in sol){
      if(Math.random()<mutationRate)
        sol[k] = (Math.floor(Math.random()*2)).toString(10);
    }
  }
  //crossover
  for(var i =0;i<this.num;i++){
    if(Math.random()<crossOverRate){
      var switchWith = Math.floor(Math.random()*this.num);
      var switchPosition = Math.floor(Math.random()*this.array[0].solution.length);
      var tempA = this.array[i].solution.splice(switchPosition);
      var tempB = this.array[switchWith].solution.splice(switchPosition);
      this.array[i].solution = this.array[i].solution.concat(tempA);
      this.array[switchWith].solution = this.array[switchWith].solution.concat(tempB);
            if(this.array[i].solution.length != 9 || this.array[switchWith].solution.length !=9)
        debugger;
    }
  }


  var solutionFound = false;
  var solution;
  var max = -10;
  var score = 0;
  for(var i = 0;i<this.num;i++){
    var gen = this.array[i];
    gen.makeBoard();
    gen.computeScore();
    if(gen.score > max){
      score = gen.score;
      solution = gen.board.rows();
    }

  }
  this.generation++;
  console.log(this.generation)
  this.generationFitness = tot;
  return {score: score, board: JSON.stringify(solution)};
}; 

var p = new Population(50);
p.initializePopulation();
var count = 0;
var ans;
var found = false;
while(count<500 && !found){
  ans = p.reproduce();
  if(ans.score === 72){
    found = true;
    console.log('found one');
  }
  count++;
}

console.log(ans);

