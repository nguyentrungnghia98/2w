var n = 3;
var m = 3;
var squares = Array(n).fill(0).map(() => Array(n).fill(0));
var turn = true; //true => X
var caro = document.querySelector(".caro");
//inital
renderCaro(n, squares);

function checkWinner(row, column, symbol){
  let winnerSquares1 = [], winnerSquares2 = [];
  let countRow = 0, countColumn = 0;
  console.log(row,column, symbol)
  // check row and column
  for(let i = 0; i < n; i++){
    
    // check row
    if(squares[row][i] === symbol){
      countRow++;
      winnerSquares1.push({i:row,j:i});
      if(countRow === m){
        return winnerSquares1;
      }
    }else{
      winnerSquares1 = [];
      countRow = 0;
    }
    

    // check column
    if(squares[i][column] === symbol){
      countColumn++;
      winnerSquares2.push({i,j:column});
      if(countColumn === m){
        return winnerSquares2;
      }
    }else{
      winnerSquares2 = [];
      countColumn = 0;
    }
    
  }
  //check diagonal right and left
  let countRight = 0;
  let countLeft = 0;
  winnerSquares1 = [];
  winnerSquares2 = [];
  const lengthDiagonal = Math.ceil(Math.sqrt(2) * n);
  for (let i = 0; i <= lengthDiagonal; i += 1) {
    // diagonal right
    const rRow = n - 1 - i;
    const rColumn = column - (n - row - 1) + i;
    if (squares[rRow] !== undefined && squares[rRow][rColumn] !== undefined) {
      if(squares[rRow][rColumn] === symbol){
        countRight++;
        winnerSquares1.push({i:rRow,j:rColumn});
        if(countRight === m){
          return winnerSquares1;
        }
      }else{
        winnerSquares1 = [];
        countRight = 0;
      }
    }
    // diagonal left
    const lRow = i;
    const lColumn = column - row + i;
    if (squares[lRow] !== undefined && squares[lRow][lColumn] !== undefined) {
      if(squares[lRow][lColumn] === symbol){
        countLeft++;
        winnerSquares2.push({i:lRow,j:lColumn});
        if(countLeft === m){
          return winnerSquares2;
        }
      }else{
        winnerSquares2 = [];
        countLeft = 0;
      }
    }
  }
}

function clickSquare(e){
  if (!e.target.matches('.square')) return;

  const square = e.target;
  const {i, j} = square.dataset;
  
  //if square was checked => ignore
  if(squares[i][j] !== 0) return;

  const symbol = turn? 'X':'O';
  squares[i][j] = symbol;
  square.innerText = symbol;
  turn = !turn;

  //check winner
  const winnerSquares = checkWinner(i,j,symbol);
  if(winnerSquares){
    // highlight winner
    console.log(winnerSquares)
    renderCaro(n, squares, winnerSquares);
    showWinner(symbol);
  }else{
    document.querySelector('.winner-box').classList.add("hidden");
  }
  
}

function onChangeSize(){
  console.log(this.value)
  if(!isNaN(this.value)) {
    n = Number.parseInt(this.value);
    squares = Array(n).fill(0).map(() => Array(n).fill(0));
    renderCaro(n, squares);
  }
}
function onChangeLength(){
  console.log(this.value)
  if(!isNaN(this.value)) m = Number.parseInt(this.value);
}

function onRestart(){
  document.querySelector('.winner-box').classList.add("hidden");
  squares = Array(n).fill(0).map(() => Array(n).fill(0));
  renderCaro(n, squares);
}

caro.addEventListener('click', clickSquare)
document.querySelector("#size").addEventListener('change', onChangeSize);
document.querySelector("#length").addEventListener('change', onChangeLength);

document.querySelector("#restart").addEventListener('click', onRestart);