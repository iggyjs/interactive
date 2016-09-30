// GLOBAL
var DEVELOPMENT = true;

var gameInitiated = false;
var doneLoading = false;
var mobile = false;
var xPos, yPos;
var compXPos, compYPos;
var song;
var WIDTH = $(window).width();
var HEIGHT = $(window).height();

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
    if (gameInitiated && !DEVELOPMENT) {
        game();
    } else if (DEVELOPMENT){
        game();
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

function drawBackground(){
    background("#F8F8F8");
}

function drawScoreText(developing){
    fill(0);
    stroke(255);
    textSize(15);

    if (!developing)
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

    if (!DEVELOPMENT) {
        fontRegular = loadFont("assets/Lato-Regular.ttf");
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