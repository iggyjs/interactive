var gameInitiated = false;

var xPos, yPos;
var compXPos, compYPos;
var song;
var compXSpeed = 5;
var compYSpeed = 4;
var WIDTH = $(window).width();
var HEIGHT = $(window).height();

var FULL_WIDTH = 2*WIDTH;
var xDesired, yDesired;
var lineIncrement = 0;

//user
var userWidth=25;
var userHeight=25;

//computer
var computerWidth = 50;
var computerHeight = 50;

//gamplay
var playerScore = 0;
var computerScore = 0;
var bounces = 0;
var newRound = false;

var playerPositions = [[100,100], [WIDTH-100,100], [100,HEIGHT-100], [WIDTH-100,HEIGHT-100]];
var computerPositions = [[300,300], [WIDTH-300,100], [300,HEIGHT-300], [300,300]];

function preload() {
  characterImage = loadImage("assets/user_character.svg");
  computerImage = loadImage("assets/user_character.svg");
  // computerImage = loadImage("assets/computer_character.svg");
}


function setup() {
  createCanvas(WIDTH, HEIGHT);

  xPos = 100 - 0.5 * characterImage.width;
  yPos = 100 - 0.5 * characterImage.height;
  compXPos = 250 - 0.5 * computerImage.width;;
  compYPos = 250 - 0.5 * computerImage.height;;
  
   // default the character to want to move to the middle of the screen
  xDesired = 250;
  yDesired = 250;
}



function mousePressed(){
  gameInitiated = true;
}


function draw() {    
    // movement logic
        if (keyIsDown(LEFT_ARROW)) {
          xPos -= 10;
        }
        if (keyIsDown(RIGHT_ARROW)) {
          xPos += 10;
        }
        if (keyIsDown(UP_ARROW)) {
          yPos -= 10;
        }
        if (keyIsDown(DOWN_ARROW)) {
          yPos += 10;
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


    //computer player

        compXPos += compXSpeed;
        compYPos += compYSpeed;

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
          var userRight = xPos + characterImage.width;
          var userLeft  = xPos;
          var userTop   = yPos;
          var userBottom = yPos + characterImage.height;

          var computerTop    = compYPos;
          var computerBottom = compYPos + computerImage.height;
          var computerRight = compXPos + computerImage.width;
          var computerLeft  = compXPos;

          // deterine if a collision has occurred
          noStroke();
          if (userRight < computerLeft || 
            userLeft > computerRight || 
            userBottom < computerTop || 
            userTop > computerBottom) {
            

          }
          else {
            // collision
            playerScore++;
            newRound = true;
          }

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

    //drawing logic
    if (gameInitiated) {
        drawBackground();

        fill(0);
        text("Time played: " + Number((millis()/1000).toFixed(1)), 50, 85);
        text("your score: " + playerScore, 50, 110);
        text("computer score: " + computerScore, 50, 130);

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

        

            xPos = newPlayerPosX - 0.5 * characterImage.width;
            yPos = newPlayerPosY - 0.5 * characterImage.height;
            compXPos = newComputerPosX - 0.5 * computerImage.width;;
            compYPos = newComputerPosY - 0.5 * computerImage.height;;
            bounces = 0;
            newRound = false;
        }
       
    } else {
        text("Intro text: click to start", 50, 50);
        
    }
}

function drawBackground(){
    background("#F8F8F8");
}