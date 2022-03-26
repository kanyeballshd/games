const gameCells = Array.from(document.getElementsByClassName('cell'));
const startPage = document.getElementById('start-page');
const difficulty = document.getElementById('difficulty');
const container = document.getElementById('container');
const gamecontainer = document.getElementById('game-container');
const result = document.getElementById("result").innerHTML;
const Player1 = 'X';
const Player2 = 'O';
let gameOn = true;
let Draw = false;
const moves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let currentPlayer = Player1;
let typeOfgame;
let gameLevel;
let winnerLine;
let movesLeft = [0, 1, 2, 3, 4, 5, 6, 7, 8];

//function for storing the type of game in a variable typeOfgame
function gametype(id) {
    if (id == "btn1") {
        typeOfgame = 1;
        startPage.style.display = "none";
        difficulty.style.display = "block";
    }
    else {
        typeOfgame = 2;
        container.style.display = "none";
        gamecontainer.style.display = "block";
    }
}
//function for storing the game difficulty in a variable gameLevel
function gamedifficulty(id) {
    if (id == "btn3")
        gameLevel = "easy";
    else
        gameLevel = "hard";
    container.style.display = "none";
    gamecontainer.style.display = "block";
}
//Event Handlers
// This function is called when any cell is clicked
const cellClicked = (e) => {
    const id = e.target.id;
    if (!gameOn)
        return;
    if (!isNaN(moves[id])) {
        moves[id] = currentPlayer;
        let pos = movesLeft.indexOf(Number(id));
        movesLeft.splice(pos, 1);
        e.target.innerText = currentPlayer;
        if (currentPlayer == Player1) {
            e.target.style.color = "#F83157";
            e.target.style.textShadow = "3px 3px #CE2948";
            if (isPlayerWon(currentPlayer)) {
                setTimeout(()=>displayResult(Player1, "won"),1000);
                document.getElementById("status").style.visibility = "hidden";
                gameOn = false;
                return;
            }
            if (checkDraw()) {
                setTimeout(()=>displayResult(player, "draw"),1000);
                document.getElementById("status").style.visibility = "hidden";
                gameOn = false;
                return;
            }
            document.getElementById("player").innerHTML = Player2;
            document.getElementById("player").style.textShadow = "1.5px 1.5px #318DB5";
            document.getElementById("player").style.color = "#3BA8D7";
            currentPlayer = Player2;
        }
        else {
            e.target.style.color = "#3BA8D7";
            e.target.style.textShadow = "3px 3px #318DB5";
            if (isPlayerWon(currentPlayer)) {
                setTimeout(()=>displayResult(Player2, "won"),1000);
                document.getElementById("status").style.visibility = "hidden";
                gameOn = false;
                return;
            }
            if (checkDraw()) {
                setTimeout(()=>displayResult(player, "draw"),1000);
                document.getElementById("status").style.visibility = "hidden";
                gameOn = false;
                return;
            }
            document.getElementById("player").innerHTML = Player1;
            document.getElementById("player").style.textShadow = "1.5px 1.5px #CE2948";
            document.getElementById("player").style.color = "#F83157";
            currentPlayer = Player1;

        }
        if (typeOfgame == 1 && gameLevel == 'easy') {
            setTimeout(() => computerTurn(), 500);
        }
        if (typeOfgame == 1 && gameLevel == 'hard') {
            setTimeout(() => aiTurn(), 500);
        }
    }
    
}
//Event listener
gameCells.forEach((cell, index) => {
    cell.addEventListener("click", cellClicked);
}) 

//This fuction checks whether the current player is winner or not
let x=window.matchMedia("(max-width: 670px)")
function isPlayerWon (currentPlayer){
    //Horizontal
    if (moves[0] == moves[1] && moves[1] == moves[2] && moves[2] == currentPlayer) {
        if(!(x.matches))
        document.getElementById("l012").style.visibility = 'visible';
        winnerLine = 'l012';
        return true;
    }
    else if (moves[3] == moves[4] && moves[4] == moves[5] && moves[5] == currentPlayer) {
        if(!(x.matches))
        document.getElementById("l345").style.visibility = 'visible';
        winnerLine = 'l345';
        return true;
    }
    else if (moves[6] == moves[7] && moves[7] == moves[8] && moves[8] == currentPlayer) {
        if(!(x.matches))
        document.getElementById("l678").style.visibility = 'visible';
        winnerLine = 'l678';
        return true;
    }
    //Vertical
    else if (moves[0] == moves[3] && moves[3] == moves[6] && moves[6] == currentPlayer) {
        if(!(x.matches))
        document.getElementById("l036").style.visibility = 'visible';
        winnerLine = 'l036';
        return true;
    }
    else if (moves[1] == moves[4] && moves[4] == moves[7] && moves[7] == currentPlayer) {
        if(!(x.matches))
        document.getElementById("l147").style.visibility = 'visible';
        winnerLine = 'l147';
        return true;
    }
    else if (moves[2] == moves[5] && moves[5] == moves[8] && moves[8] == currentPlayer) {
        if(!(x.matches))
        document.getElementById("l258").style.visibility = 'visible';
        winnerLine = 'l258';
        return true;
    }
    //Diagonals
    else if (moves[0] == moves[4] && moves[4] == moves[8] && moves[8] == currentPlayer) {
        if(!(x.matches))
        document.getElementById("l048").style.visibility = 'visible';
        winnerLine = 'l048';
        return true;
    }
    else if (moves[2] == moves[4] && moves[4] == moves[6] && moves[6] == currentPlayer) {
        if(!(x.matches))
        document.getElementById("l246").style.visibility = 'visible';
        winnerLine = 'l246';
        return true;
    }
    else
        return false;
}
let i, draw;
//This function is used to check if the game is draw
function checkDraw() {
    if(movesLeft.length==0)
    {
        Draw=true;
        return true;
    }
    else
    return false;
}
// this function displays the result 
function displayResult(player, status) {
    document.getElementById("displayresult").style.display = "flex";
    gamecontainer.style.opacity = '0.5';
    if (status == "won") {
        document.getElementById("winner").innerText = player;
        if (player == 'X') {
            if(typeOfgame==1)
            document.getElementById("result").innerText = "You Won the Game!";
            else{
            document.getElementById("winner").style.textShadow = "1.5px 1.5px #CE2948";
            document.getElementById("winner").style.color = "#F83157";
            }
        }
        else {
            if(typeOfgame==1)
            document.getElementById("result").innerText = "You Lost the Game!";
            else{
            document.getElementById("winner").style.textShadow = "1.5px 1.5px #318DB5";
            document.getElementById("winner").style.color = "#3BA8D7";
            }
        }
    }
    else {
        document.getElementById("result").innerText = "Game Draw!";
    }
}
function finalResult(id) {
    if (id == "btn4") {
        currentPlayer = Player1;
        container.style.display = "flex";
        gamecontainer.style.display = "none";
        gamecontainer.style.opacity = '1';
        if (typeOfgame == 1) {
            difficulty.style.display = "none";
            startPage.style.display = 'block';
        }
        document.getElementById("displayresult").style.display = "none";
        if (Draw == false)
            document.getElementById(winnerLine).style.visibility = 'hidden';
        document.getElementById("result").innerHTML = result;
        document.getElementById("status").style.visibility = "visible";
        document.getElementById("player").style.color = "#F83157";
        document.getElementById("player").style.textShadow = "1.5px 1.5px #CE2948";
        document.getElementById("player").innerHTML = Player1;
        gameOn = true;
        Draw = false;
        for (i = 0; i < 9; i++) {
            moves[i] = i;
        }
        for (i = 0; i < 9; i++) {
            document.getElementById(i).innerText = "";
        }
        for (i = 0; i < 9; i++) {
            movesLeft[i] = i;
        }
    }
    else {
        currentPlayer = Player1;
        gamecontainer.style.opacity = '1';
        document.getElementById("displayresult").style.display = "none";
        document.getElementById("status").style.visibility = "visible";
        document.getElementById("player").style.color = "#F83157";
        document.getElementById("player").style.textShadow = "1.5px 1.5px #CE2948";
        document.getElementById("player").innerHTML = Player1;
        if (Draw == false)
            document.getElementById(winnerLine).style.visibility = 'hidden';
        document.getElementById("result").innerHTML = result;
        gameOn = true;
        Draw = false;
        for (i = 0; i < 9; i++) {
            moves[i] = i;
        }
        for (i = 0; i < 9; i++) {
            document.getElementById(i).innerText = "";
        }
        for (i = 0; i < 9; i++) {
            movesLeft[i] = i;
        }
    }
}
//code for easy AI , It choses random position from the available position, if there are any available position by which AI can win then 
//the ai choses that position
let turn;
let position;
function canWin(movesLeft){
    let board=[...moves];
    for(position=0;position<movesLeft.length;position++)
    {
        turn=movesLeft[position];
        board[turn]=Player2;
        if(winning(board,Player2))
        return true;
        else
        {
        board=[...moves];
        }
    }
}
function computerTurn() {
    let pos;
    let cell;
    if(canWin(movesLeft))
    {
        pos=turn;
        cell = document.getElementById(moves[pos]);
        moves[pos] = currentPlayer;
        movesLeft.splice(position, 1);
    }
    else
    {
    pos = Math.floor(Math.random() * movesLeft.length);
    cell = document.getElementById(movesLeft[pos]);
    moves[movesLeft[pos]] = currentPlayer;
    movesLeft.splice(pos, 1);
    }
    cell.innerText = currentPlayer;
    cell.style.color = "#3BA8D7";
    cell.style.textShadow = "3px 3px #318DB5";
    if (isPlayerWon(currentPlayer)) {
        setTimeout(()=>displayResult(Player2, "won"),1000);
        document.getElementById("status").style.visibility = "hidden";
        gameOn = false;
        return;
    }
    document.getElementById("player").innerHTML = Player1;
    document.getElementById("player").style.textShadow = "1.5px 1.5px #CE2948";
    document.getElementById("player").style.color = "#F83157";
    currentPlayer = Player1;
}
// code for Hard Level AI , this is an advance AI that searches for all the position and then chooses a best move
let a=0;
function aiTurn(){
    let bestMove=minimax(moves,Player2);
    pos=bestMove.index;
    moves[pos]= currentPlayer;
    let pos1;
    pos1=movesLeft.indexOf(pos)
    movesLeft.splice(pos1, 1);
    let cell = document.getElementById(pos);
    cell.innerText = currentPlayer;
    cell.style.color = "#3BA8D7";
    cell.style.textShadow = "3px 3px #318DB5";
    if (isPlayerWon(currentPlayer)) {
        setTimeout(()=>displayResult(Player2, "won"),1000);
        document.getElementById("status").style.visibility = "hidden";
        gameOn = false;
        return;
    }
    document.getElementById("player").innerHTML = Player1;
    document.getElementById("player").style.textShadow = "1.5px 1.5px #CE2948";
    document.getElementById("player").style.color = "#F83157";
    currentPlayer = Player1;
}

function minimax(newBoard, player){
    //available spots
    var availSpots = emptyIndexies(newBoard);
  
    // checks for the terminal states such as win, lose, and tie and returning a value accordingly
    if (winning(newBoard, Player1)){
       return {score:-10};
    }
      else if (winning(newBoard, Player2)){
      return {score:10};
      }
    else if (availSpots.length === 0){
        return {score:0};
    }
  
  // an array to collect all the objects
    var gamemoves = [];
  
    // loop through available spots
    for (var i = 0; i < availSpots.length; i++){
      //create an object for each and store the index of that spot that was stored as a number in the object's index key
      var move = {};
        move.index = newBoard[availSpots[i]];
  
      // set the empty spot to the current player
      newBoard[availSpots[i]] = player;
  
      //if collect the score resulted from calling minimax on the opponent of the current player
      if (player == Player2){
        var result = minimax(newBoard, Player1);
        move.score = result.score;
      }
      else{
        var result = minimax(newBoard, Player2);
        move.score = result.score;
      }
  
      //reset the spot to empty
      newBoard[availSpots[i]] = move.index;
  
      // push the object to the array
      gamemoves.push(move);
    }
  
  // if it is the computer's turn loop over the gamemoves and choose the move with the highest score
    var bestMove;
    if(player === Player2){
      var bestScore = -10000;
      for(var i = 0; i < gamemoves.length; i++){
        if(gamemoves[i].score > bestScore){
          bestScore = gamemoves[i].score;
          bestMove = i;
        }
      }
    }else{
  
  // else loop over the gamemoves and choose the move with the lowest score
      var bestScore = 10000;
      for(var i = 0; i < gamemoves.length; i++){
        if(gamemoves[i].score < bestScore){
          bestScore = gamemoves[i].score;
          bestMove = i;
        }
      }
    }
  
  // return the chosen move (object) from the array to the higher depth
    return gamemoves[bestMove];
  }
  
  // returns the available spots on the board
  function emptyIndexies(board){
    return  board.filter(s => s != "O" && s != "X");
  }
  
  // winning combinations using the board indexies for instace the first win could be 3 xes in a row
  function winning(board, player){
   if (
          (board[0] == player && board[1] == player && board[2] == player) ||
          (board[3] == player && board[4] == player && board[5] == player) ||
          (board[6] == player && board[7] == player && board[8] == player) ||
          (board[0] == player && board[3] == player && board[6] == player) ||
          (board[1] == player && board[4] == player && board[7] == player) ||
          (board[2] == player && board[5] == player && board[8] == player) ||
          (board[0] == player && board[4] == player && board[8] == player) ||
          (board[2] == player && board[4] == player && board[6] == player)
          ) {
          return true;
      } else {
          return false;
      }
  }
  
