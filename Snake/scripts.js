var canvas = document.getElementById('snake');
var ctx = canvas.getContext('2d');
//inital
var numbserSquare = 20, sizeSquare = 400/20; // 20 x 20 = 400
var speed = 1000; //1 ms
var mode = "a";
var interval;
let snake = {
  x: 9, 
  y: 9,
  tails: [],
  nextX: 1,
  nextY: 0
}

function randomBail(){
  do{
    var x = Math.floor(Math.random() * numbserSquare);
    var y = Math.floor(Math.random() * numbserSquare);
    var isNotValid = snake.tails.some(loc => loc.x === x && loc.y === y) || 
    (x=== snake.x && y === snake.y);
  }while(isNotValid)
  
  return {x,y}
}
var bail = randomBail();

function drawBail(){
  ctx.fillStyle = "red";
  ctx.fillRect(
    bail.x*sizeSquare, bail.y*sizeSquare, sizeSquare, sizeSquare
  );
}

function isHeadContactTail(){
  return snake.tails.some(loc => loc.x === snake.x && loc.y === snake.y)
}
function isHeadContactWall(){
  if(snake.x > 19 || snake.x < 0 || snake.y > 19 || snake.y < 0) return true;
  return false
}

function endGame(isWin = false){
  clearInterval(interval);
  const winnerBox = document.querySelector('.winner-box');
  winnerBox.classList.remove("hidden");
  winnerBox.querySelector(".status").innerHTML = isWin? "You win":"You lose";
}

function draw(){
  //clear game
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  //save last old tail
  let lastLoc;
  if(snake.tails.length){
    const endTail = snake.tails[snake.tails.length - 1]
    lastLoc =  {x: endTail.x, y: endTail.y}
  } else{
    lastLoc = {x: snake.x, y: snake.y}
  }
  
  //move snake
  if(snake.tails.length){
    const tails = snake.tails;
    for(let i = tails.length - 1; i>= 1; i--){
      tails[i].x = tails[i-1].x;
      tails[i].y = tails[i-1].y
    }
    tails[0].x = snake.x;
    tails[0].y = snake.y;
  }
  
  snake.x += snake.nextX;
  snake.y += snake.nextY;


  // check current step
  if(isHeadContactTail()) {
    console.log('snake', snake);
    return endGame();

  }
  if(isHeadContactWall()){
    if(mode === 'a')  return endGame();

    if(snake.x > 19) snake.x = 0;
    if(snake.x < 0) snake.x = 19;
    if(snake.y > 19) snake.y = 0;
    if(snake.y < 0) snake.y = 19;
  }

  // if snake bite bail
  if(snake.x === bail.x && snake.y === bail.y) {
    // push in tail
    snake.tails.push(lastLoc)

    // if snake full length => end game
    if(snake.tails.length === 20*20 - 1) return endGame(true);

    bail = randomBail();
  }

  //draw head snake
  ctx.fillStyle = "black";

  ctx.fillRect(
    snake.x*sizeSquare, snake.y*sizeSquare, sizeSquare, sizeSquare
  );
  // draw tail snake
  for(let tail of snake.tails){
    ctx.fillStyle = "black";

    ctx.fillRect(
      tail.x*sizeSquare, tail.y*sizeSquare, sizeSquare, sizeSquare
    );
  }
  //
  drawBail();
  wait = false;
}

interval = setInterval(draw, speed);

// on user change direction
var wait = false
function keyDownEvent(e) {
  if(wait) return
  switch (e.keyCode) {
    case 37:
      //prevent go backwards
      if(snake.nextX !== 1 || snake.nextY !== 0 || !snake.tails.length){
        snake.nextX = -1;
        snake.nextY = 0;
        wait = true;
      }
      break;
    case 38:
      if(snake.nextX !== 0 || snake.nextY !== 1|| !snake.tails.length){
        snake.nextX = 0;
        snake.nextY = -1;
        wait = true;
      }
      break;
    case 39:
      if(snake.nextX !== -1 || snake.nextY !== 0 || !snake.tails.length){
        snake.nextX = 1;
        snake.nextY = 0;
        wait = true;
      }
      break;
    case 40:
      if(snake.nextX !== 0 || snake.nextY !== -1 || !snake.tails.length){
        snake.nextX = 0;
        snake.nextY = 1;
        wait = true
      }
      break;
  }
}
document.addEventListener("keydown", (e) => {
  setTimeout(()=> {
    keyDownEvent(e);
  })
});

// change mode
function setMode(_mode){
  mode = _mode;
  console.log(mode)
}

// on restart
function onRestart(){
  document.querySelector('.winner-box').classList.add("hidden");
  wait = false;
  snake = {
    x: 9, 
    y: 9,
    tails: [],
    nextX: 1,
    nextY: 0
  }
  interval = setInterval(draw, speed);

}
document.querySelector("#restart").addEventListener('click', onRestart);