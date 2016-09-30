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



function preload() {
  // characterImage = loadImage("assets/user_character.svg");
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

  fontRegular = loadFont("assets/Lato-Regular.ttf");

  song = loadSound("assets/game.m4a");
}

function setup() {
  doneLoading = true;
  $("#bool").html("true");
  console.log("called rom sketch.js");
  song.play();
  song.loop();
  createCanvas(WIDTH, HEIGHT);
  //initial positions
  xPos = 100 - 0.5 * characterImage.width;
  yPos = 100 - 0.5 * characterImage.height;
  compXPos = 250 - 0.5 * computerImage.width;;
  compYPos = 250 - 0.5 * computerImage.height;;
}

function mousePressed(){
  if (!mobile)
    gameInitiated = true;
}

function drawBackground(){
    background("#F8F8F8");
}

function draw() {
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

    var userRight = xPos + characterImage.width;
    var userLeft  = xPos;
    var userTop   = yPos;
    var userBottom = yPos + characterImage.height;

    var computerTop    = compYPos;
    var computerBottom = compYPos + computerImage.height;
    var computerRight = compXPos + computerImage.width;
    var computerLeft  = compXPos;


    //switch computer images

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

    // chase logic
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


    //player movement
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
    
    xPos += playerXSpeed;
    yPos += playerYSpeed;

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


    //computer score
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

    //collisions
    if (userRight < computerLeft || userLeft > computerRight || userBottom < computerTop || userTop > computerBottom) {

    }
    else {
        // collision
        playerScore++;
        newRound = true;
    }

    //drawing logic
    if (gameInitiated) {
        drawBackground();
        fill(0);
        stroke(255);
        textSize(15);
        textFont(fontRegular);
        textStyle(NORMAL);

        text("Time played: " + Number((millis()/1000).toFixed(1)), 50, 45);
        text("Your score: " + playerScore, 50, 69);
        text("Computer score: " + computerScore, 50, 92);

        fill("#44B78B");

        //user
        image(characterImage, xPos, yPos);

        //computer player
        
        image(computerImage, compXPos, compYPos);


        if (newRound) {
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
       
    } else {

    }
}