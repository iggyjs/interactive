// GLOBAL
// TODO:
/*
    - Add some HTML Panel to engage in cheat mode
    = Add start screen to choose difficulty
    - Have different difficulty settings
    - Design background for game
    - Create some obstacle
    - Implement lives
    - Attach Parse to record high scores    
*/
var DEVELOPMENT = true;

//start screen
var startScreenCounter = 0;
var stars = [];
var starsOpacity = 0.8;
var cellColors = ["#8177E9", "#5BCECA", "#FB6868"];
var cellStrokes = ["#5345E9", "#42AAA6", "#A93A3A"];
var cellDimensions = [85, 85, 85];

var startPlayerXSpeed = 0;
var startPlayerYSpeed = 0;
var startAcceleration = 0.05;
var inCell1, inCell2, inCell3 = false;


var gameInitiated = false;
var doneLoading = false;
var mobile = false;
var xPos, yPos;
var compXPos, compYPos;
var song;
var WIDTH = $(window).width();
var HEIGHT = $(window).height();

var startPlayerX = WIDTH/2;
var startPlayerY = HEIGHT-100;

//user
var userWidth=25;
var userHeight=25;
var playerXSpeed = 0;
var playerYSpeed = 0;
var acceleration = 0.05;

//computer
var compXSpeed = 1;
var compYSpeed = 1.2;
var computerWidth = 50;
var computerHeight = 50;

//gamplay
var playerScore = 0;
var computerScore = 0;
var bounces = 0;
var newRound = false;
var playerPositions = [[100,100], [WIDTH-100,100], [100,HEIGHT-100], [WIDTH-100,HEIGHT-100]];
var computerPositions = [[300,300], [WIDTH-300,200], [300,HEIGHT-300], [300,300]];

// Defined for readability
function difficulty(){
    if (playerScore == 0) {
        compXPos += compXSpeed;
        compYPos += compYSpeed;    
    }

    //increase difficulty
    if (playerScore >= 1){
        var scalar = playerScore * 0.05;
        compXPos += compXSpeed + (compXSpeed*scalar);
        compYPos += compYSpeed + (compYSpeed*scalar);
    }
}

function callComputerMovementLogic(){   
    // right
    if(compXSpeed > 0 && compXSpeed > compYSpeed)
        computerImage = computerRight;
    // left
    if(compXSpeed < 0 && compXSpeed < compYSpeed)
        computerImage = computerLeft;
    // up
    if(compYSpeed > 0 && compYSpeed > compXSpeed)
        computerImage = computerUp;
    // down
    if(compYSpeed < 0 && compYSpeed < compXSpeed)
        computerImage = computerDown;
}

function callPlayerMovementLogic(){
    if (keyIsDown(LEFT_ARROW)) {
      playerXSpeed -= acceleration;
      characterImage = playerLeft;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      playerXSpeed += acceleration;
      characterImage = playerRight;
    }
    if (keyIsDown(UP_ARROW)) {
      playerYSpeed -= acceleration;
      characterImage = playerUp;
    }
    if (keyIsDown(DOWN_ARROW)) {
      playerYSpeed += acceleration;
      characterImage = playerDown;
    }

    //wrap around
    if (xPos > width) {
      xPos = 0;
    }
    if (xPos < 0) {
      xPos = width;
    }
    if (yPos > HEIGHT) {
      yPos = 0;
    }
    if (yPos < 0) {
      yPos = HEIGHT;
    }
}

function movePlayer(){
    xPos += playerXSpeed;
    yPos += playerYSpeed;
}

function callChaseLogic(userRight, userLeft, userTop, userBottom, computerTop, computerBottom, computerRight, computerLeft) {
    if (userRight < computerLeft) {
        // left
        if (compXSpeed < 0)
            compXSpeed *=-1
    }

    if (userLeft > computerRight) {
    // right
        if (compXSpeed > 0)
            compXSpeed*= -1
    }
    
    if (userBottom < computerTop) {
        // top
        if (compYSpeed < 0)
            compYSpeed *= -1
    }
    if (userTop > computerBottom) {
        // bottom
        if (compYSpeed > 0)
            compYSpeed *= -1
    }
}

function checkComputerScore(){
    if (compXPos > width) {
        computerScore++;
        newRound = true;
    }
    if (compXPos < 0) {
        computerScore++;
        newRound = true;
    }
    if (compYPos > HEIGHT) {
        computerScore++;
        newRound = true;
    }
    if (compYPos < 0) {
        computerScore++;
        newRound = true;
    }
}

function drawGame(){
    //drawing logic
    if (gameInitiated) {
        game();
    } else {
        drawStartScreen();
    }
}

function game(){
    drawBackground();
    drawScoreText(DEVELOPMENT);
    drawCharacters();    

    if (newRound) {
        startNewRound();
    }   
}


function drawStartScreen(){
    
    //text
    textSize(20);
    textFont(fontRegular);
    textAlign(CENTER);
    text("Select a difficulty", WIDTH/2, 100);

    // stars
    startScreenCounter++;

    if (startScreenCounter%30 == 0) {
        stars.push(rect(random(0,WIDTH), random(0,HEIGHT), 1, 1));
    }

    fill('rgba(255,255,255)');
    noStroke();
    

    for (var i=0; i<stars.length; i++){
        stars[i];
    }


    difficultyCell(WIDTH/2 - 160, 300, 0, "Easy");
    difficultyCell(WIDTH/2, 300, 1, "Hard");
    difficultyCell(WIDTH/2 + 160, 300, 2, "Nope");

    drawStartPlayer();
}


function drawStartPlayer(){
    image(startScreenPlayer, startPlayerX, startPlayerY);
    tint(random(0,255), random(0,255), random(0,255));  // Tint blue
    callStartPlayerMovementLogic();
}

function callStartPlayerMovementLogic(){
    // change
    if (keyIsDown(LEFT_ARROW)) {
        startPlayerXSpeed -= acceleration;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        startPlayerXSpeed += acceleration;
    }
    if (keyIsDown(UP_ARROW)) {
        startPlayerYSpeed -= acceleration;
    }
    if (keyIsDown(DOWN_ARROW)) {
        startPlayerYSpeed += acceleration;
    }

    //wrap around
    if (startPlayerX > width) {
      startPlayerX = 0;
    }
    if (startPlayerX < 0) {
      startPlayerX = width;
    }
    if (startPlayerY > HEIGHT) {
      startPlayerY = 0;
    }
    if (startPlayerY < 0) {
      startPlayerY = HEIGHT;
    }

    moveStartPlayer();

}

function moveStartPlayer(){
    startPlayerX += startPlayerXSpeed;
    startPlayerY += startPlayerYSpeed;

}

function difficultyCell(x,y,i,difficultyText){

    if (startPlayerX > x-(cellDimensions[i]/2) && startPlayerX < x+(cellDimensions[i]/2) && startPlayerY < y+(cellDimensions[i]/2) && startPlayerY > y-(cellDimensions[i]/2)) {
        if (i==0)
            inCell1 = true;

        if (i==1)
            inCell2 = true;

        if (i==2)
            inCell3 = true;
        
        cellDimensions[i]+=5;
        fill(cellColors[i]);
        stroke(cellStrokes[i]);
        ellipse(x,y,cellDimensions[i],cellDimensions[i]);
        noStroke();
        fill(255,255,255);
        textSize(15);
        text(difficultyText,x,y+5)  
    }

    else {
        if (inCell1){
            fill(cellColors[0]);
            noStroke();
            ellipse(x,y,cellDimensions[i],cellDimensions[i]);
            
        }

        else if (inCell2) {
            fill(cellColors[1]);
            noStroke();
            ellipse(x,y,cellDimensions[i],cellDimensions[i]);
        }

        else if (inCell3) {
            fill(cellColors[2]);
            noStroke();
            ellipse(x,y,cellDimensions[i],cellDimensions[i]);
        }

        else { //not in any cells
            fill(cellColors[i]);
            stroke(cellStrokes[i]);
            ellipse(x,y,cellDimensions[i],cellDimensions[i]);
            noStroke();
            fill(255,255,255);
            textSize(15);
            text(difficultyText,x,y+5);
        }
    }
}


function drawBackground(){
    background("#F8F8F8"); 
}

function drawScoreText(developing){
    fill(0);
    stroke(255);
    textSize(15);
    textFont(fontRegular);

    textStyle(NORMAL);
    text("Time played: " + Number((millis()/1000).toFixed(1)), 50, 45);
    text("Your score: " + playerScore, 50, 69);
    text("Computer score: " + computerScore, 50, 92);
}

function drawCharacters(){
    fill("#44B78B");

    //user
    image(characterImage, xPos, yPos);

    //computer player
    image(computerImage, compXPos, compYPos);
}

function startNewRound(){
    drawBackground();
    var index = parseInt(random(0,3));
    newPlayerPos = playerPositions[index];
    newComputerPos = computerPositions[index];


    newPlayerPosX = newPlayerPos[0];
    newPlayerPosY = newPlayerPos[1];

    newComputerPosX = newComputerPos[0];
    newComputerPosY = newComputerPos[1];

    playerXSpeed = 0;
    playerYSpeed = 0;

    xPos = newPlayerPosX - 0.5 * characterImage.width;
    yPos = newPlayerPosY - 0.5 * characterImage.height;
    compXPos = newComputerPosX - 0.5 * computerImage.width;;
    compYPos = newComputerPosY - 0.5 * computerImage.height;;
    newRound = false;
}


// p5 functions
function mousePressed(){
  if (!mobile)
    gameInitiated = true;
}

function preload() {
    playerUp = loadImage("assets/player_up.svg");
    playerDown = loadImage("assets/player_down.svg");
    playerLeft = loadImage("assets/player_left.svg");
    playerRight = loadImage("assets/player_right.svg");
    characterImage = playerUp;

    computerUp = loadImage("assets/computer_up.svg");
    computerDown = loadImage("assets/computer_down.svg");
    computerRight = loadImage("assets/computer_right.svg");
    computerLeft = loadImage("assets/computer_left.svg");
    computerImage = computerUp;

    startScreenPlayer = loadImage('assets/start_player.svg');

    fontRegular = loadFont("assets/Lato-Regular.ttf");

    if (!DEVELOPMENT) {
        song = loadSound("assets/game.m4a");
    }
}

function setup() {
    doneLoading = true;
    $("#bool").html("true");

    createCanvas(WIDTH, HEIGHT);
    
    //initial character positions
    xPos = 100 - 0.5 * characterImage.width;
    yPos = 100 - 0.5 * characterImage.height;
    compXPos = 250 - 0.5 * computerImage.width;;
    compYPos = 250 - 0.5 * computerImage.height;

    if (!DEVELOPMENT) {
        song.play();
        song.loop();
    }

    background("#2F334D");
}

function draw() {
    var userRight = xPos + characterImage.width;
    var userLeft  = xPos;
    var userTop   = yPos;
    var userBottom = yPos + characterImage.height;

    var computerTop    = compYPos;
    var computerBottom = compYPos + computerImage.height;
    var computerRight = compXPos + computerImage.width;
    var computerLeft  = compXPos;

    //increase difficulty
    difficulty();

    //movement
    callComputerMovementLogic();
    callPlayerMovementLogic();
    movePlayer();

    //chase
    callChaseLogic(userRight, userLeft, userTop, userBottom, computerTop, computerBottom, computerRight, computerLeft);

    //computer score
    checkComputerScore();

    //collisions
    if (userRight < computerLeft || userLeft > computerRight || userBottom < computerTop || userTop > computerBottom) {

    }
    else {
        // collision
        playerScore++;
        newRound = true;
    }    
    drawGame();
}