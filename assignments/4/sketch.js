var WIDTH = $(window).width();
var HEIGHT = $(window).height();
var fontRegular;

var popFrequencies = [60, 90, 120]
var frameCount
var click = false;
var score = 0;
var state = 0;


function preload(){
  fontRegular = loadFont("assets/Uni-Sans-Thin.otf");
  fontHeavy = loadFont("assets/Uni-Sans-Heavy-Italic.otf");
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

  var now = moment();
  console.log(now.format("hh:mm:ss"));

}

function draw() {
  background(255);

  if (state == 1) {
    textFont(fontRegular);
    fill(0);
    textSize(18);
    text("Simple whack-a-mole", 15, 25);
    textSize(14);
    text("score: "+ score, 15, 50);


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
  } else if (state == 0){
    textFont(fontHeavy);
    fill(0);
    textSize(24);
    text("Simple whack-a-mole", WIDTH/2 - 120, HEIGHT/2 - 100);
    textSize(14);
    text("15 seconds to play, click to start.", WIDTH/2 - 110, HEIGHT/2 - 50);
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
    if ((mouseX > this.xPos) && (mouseX < this.xPos + 25) && (mouseY < this.yPos + 25) && (mouseY > this.yPos) && (this.state == 1)) {
      score++;
      this.state = 0;
    }
  }
}

function mousePressed() {
  if (state ==1) {
    mole1.checkForClick();
    mole2.checkForClick();
    mole3.checkForClick();
    mole4.checkForClick();
    mole5.checkForClick();
    mole6.checkForClick();
    mole7.checkForClick();
    mole8.checkForClick();
    mole9.checkForClick();
  } else if (state == 0) {
    state = 1;
  }

}