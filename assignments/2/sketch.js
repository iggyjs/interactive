var gameInitiated = false;

var xPos, yPos;
var compXPos, compYPos;
var song;
var compXSpeed = 1;
var compYSpeed = 2;
var WIDTH = $(window).width();
var HEIGHT = $(window).height();
var upperBound = HEIGHT-180;

var FULL_WIDTH = 2*WIDTH;
var xDesired, yDesired;
var lineIncrement = 0;

// sunset
var blue = [156, 203, 247];
var yellow = [255, 226, 174];
var red = [255, 213, 213];
var gradientFinished = false;

function preload() {
  // song = loadSound("assets/game.mp3");
  // background = loadImage("assets/background.svg");
  windowImage = loadImage("assets/window.svg")
}


function setup() {
  createCanvas(WIDTH, HEIGHT);
  // song.play();
  xPos = 250;
  yPos = 250;
  compXPos = 100;
  compYPos = 100;
  
   // default the character to want to move to the middle of the screen
  xDesired = 250;
  yDesired = 250;
}



function mousePressed(){
  gameInitiated = true;
}


function draw() {
    // background don't touch
    background("#F8F8F8");
    fill("#B6A2A2");
    rect(0,HEIGHT-54, FULL_WIDTH,200);
    fill("#997777");
    rect(0,HEIGHT-175, FULL_WIDTH,50);

    //outdoors
    fill(255, 255, 255);
    rectMode(CORNER);
    rect(WIDTH/3, 0, WIDTH, (0.6*HEIGHT));
    rectMode(CENTER);

    //WINDOW IMAGE
    image(windowImage, WIDTH/3, 0, (WIDTH), (0.6*HEIGHT));
    noStroke();
    var distX = xPos - compXPos;
    var distY = yPos - compYPos;

    // move 5% of the way toward the desired position
    compXPos += 0.02 * distX;
    compYPos += 0.02 * distY;

    
    
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
        
        if (xPos > width) {
          xPos = 0;
        }
        if (xPos < 0) {
          xPos = width;
        }
        if (yPos > upperBound) {
          yPos = 0;
        }
        if (yPos < 0) {
          yPos = upperBound;
        }

        if (compXPos > width || compXPos < 0) {
          compXSpeed *= -1
        }
        
        if (compYPos > height || compYPos < 0) {
          compYSpeed *= -1;
        }


    //drawing logic
    if (gameInitiated) { 
        fill("#44B78B");
        // draw the character
        ellipse(xPos, yPos, 25, 25);
        rect(compXPos, compYPos, 50, 50);
    } else {
        fill(0);
        text("Intro text: click to start", 50, 50);
    }

    // if (lineIncrement!=FULL_WIDTH)
    //     lineIncrement += 0.01 * (FULL_WIDTH-lineIncrement)
}


function keyPressed() {
  // do key pressed stuff here
}