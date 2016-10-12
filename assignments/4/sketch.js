var WIDTH = $(window).width();
var HEIGHT = $(window).height();
var fontRegular;

var popFrequencies = [60, 90, 120]
var frameCount
var click = false;
var score = 0;
var state = 0;

var ALLOTTED_TIME = 15;

// RESET
var timerCounter = 0;
var timer = ALLOTTED_TIME;
var timeStop;
var arcFill=6.282;


var hitImage;

function preload(){
  fontRegular = loadFont("assets/Uni-Sans-Thin.otf");
  fontHeavy = loadFont("assets/Uni-Sans-Heavy-Italic.otf");
  preHitImage = loadImage("assets/images/hammer.svg");
  postHitImage = loadImage("assets/images/hammer_hit.svg");

}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  //column 1
  mole1 = new Mole(WIDTH/2-100, 200);
  mole2 = new Mole(WIDTH/2-100, 300);
  mole3 = new Mole(WIDTH/2-100, 400);

  //column 2
  mole4 = new Mole(WIDTH/2, 200);
  mole5 = new Mole(WIDTH/2, 300);
  mole6 = new Mole(WIDTH/2, 400);

  //column 3
  mole7 = new Mole(WIDTH/2+100, 200);
  mole8 = new Mole(WIDTH/2+100, 300);
  mole9 = new Mole(WIDTH/2+100, 400);

  hitImage = preHitImage;
}

function draw() {
  background(255);

  if (state == 1) {
    timerCounter++;
    textFont(fontHeavy);
    fill(0);
    textSize(14);
    text("score: "+ score, 25, 35);

    // pretty timer
    text(timer, WIDTH-56.5, 54);
    noFill();
    arc(WIDTH-50, 50, 40, 40, 0, arcFill, OPEN);

    if (parseInt(moment().format("ss")) == timeStop){
      state = 2;
    }
    
    if (timerCounter%60 == 0){
      timer--;
      arcFill -= TWO_PI/ALLOTTED_TIME;
    }

  
    mole1.display();
    mole2.display();
    mole3.display();
    mole4.display();
    mole5.display();
    mole6.display();
    mole7.display();
    mole8.display();
    mole9.display();

    mole1.stateCheck();
    mole2.stateCheck();
    mole3.stateCheck();
    mole4.stateCheck();
    mole5.stateCheck();
    mole6.stateCheck();
    mole7.stateCheck();
    mole8.stateCheck();
    mole9.stateCheck();

    // cursor graphics
    image(hitImage, mouseX-18, mouseY-20);

  }

  else if (state == 0){
    drawStartScreen();
  }

  else if (state == 2){
    drawGameOverScreen();
  }
}

function Mole(x, y) {
  this.xPos = x;
  this.yPos = y;
  this.changeInterval = popFrequencies[Math.floor(random(0, popFrequencies.length))];
  this.state = 0;

  this.display = function() {
    if (this.state == 0) {
      fill(128);
      rect(this.xPos, this.yPos, 50, 50);
    } else if (this.state == 1) {
      fill("#3949AB");
      rect(this.xPos, this.yPos, 50, 50);
    }
  }

  this.stateCheck = function() {

    if (frameCount % this.changeInterval == 0) {
      this.changeState();
    }
  }

  this.changeState = function() {
    if (this.state == 0) {
      this.state = 1;
    } else if (this.state == 1) {
      this.state = 0;
    }
  }

  this.checkForClick = function() {
    if ((mouseX > this.xPos) && (mouseX < this.xPos + 50) && (mouseY < this.yPos + 50) && (mouseY > this.yPos) && (this.state == 1)) {
      score++;
      this.state = 0;
    }
  }
}

function drawStartScreen(){
  textFont(fontHeavy);
  fill(0);
  textSize(24);
  text("Simple whack-a-mole", WIDTH/2 - 120, HEIGHT/2 - 100);
  textSize(14);
  text("15 seconds to play, click to start.", WIDTH/2 - 110, HEIGHT/2 - 50);
}

function drawGameOverScreen(){
  textFont(fontHeavy);
  fill(0);
  textSize(24);
  text("Game over!", WIDTH/2 - 80, HEIGHT/2 - 100);
  textSize(14);
  text("Your score: " + score, WIDTH/2 - 65, HEIGHT/2 - 70);
  text("Click to play again.", WIDTH/2 - 80, HEIGHT/2 - 20);
}

function mouseReleased(){
  hitImage = preHitImage;
}


function mousePressed() {
  if (state ==1) {
    hitImage = postHitImage;

    mole1.checkForClick();
    mole2.checkForClick();
    mole3.checkForClick();
    mole4.checkForClick();
    mole5.checkForClick();
    mole6.checkForClick();
    mole7.checkForClick();
    mole8.checkForClick();
    mole9.checkForClick();

  }

  else if (state == 0) {
    state = 1;
    timeStop = moment().add(ALLOTTED_TIME, "seconds").format("ss");
  }

  else if (state == 2) {
    state = 1;
    score = 0;
    timerCounter=0;
    timer = ALLOTTED_TIME;
    timeStop = moment().add(ALLOTTED_TIME, "seconds").format("ss");
    arcFill=6.282;
  }

}