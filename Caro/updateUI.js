function renderCaro(n, squares, winnerSquares = []){
  console.log("renderCaro")
  const caro = document.querySelector(".caro");
  let html = "";
  let isWin;
  if(winnerSquares && winnerSquares.length > 0) isWin = true

  for(let i = 0; i < n; i++){
    let squaresHTML = "";
    for(let j = 0; j < n; j++){
      let isHighLight =  false;
      if (isWin) {
        isHighLight = winnerSquares.some(loc => loc.i == i && loc.j == j);
      }
      const symbol = squares[i][j] === 0? '': squares[i][j];
      squaresHTML += `<button data-i=${i} ${isWin?'disabled': ''} data-j=${j} class="square ${isHighLight?'hight-light':''}">${symbol}</button>`
    }
    html += `
      <div class="row">${squaresHTML}</div>
    `
  }
  if(html) caro.innerHTML = html;
}

function showWinner(symbol){
  const winnerBox = document.querySelector('.winner-box');
  winnerBox.classList.remove("hidden");
  document.querySelector(".winner").innerHTML = symbol;
}