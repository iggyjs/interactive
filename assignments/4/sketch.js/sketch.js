var myBall;
var frameCount
var click = false;

function setup() {
  createCanvas(500, 500);

  //column 1
  mole1 = new Ball(50, 50);
  mole2 = new Ball(50, 100);
  mole3 = new Ball(50, 150);

  //column 2
  mole4 = new Ball(100, 50);
  mole5 = new Ball(100, 100);
  mole6 = new Ball(100, 150);

  //column 3

  mole7 = new Ball(150, 50);
  mole8 = new Ball(150, 100);
  mole9 = new Ball(150, 150);

}

function draw() {
  background(255);
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

}

function Ball(x, y) {
  this.xPos = x;
  this.yPos = y;

  this.changeInterval = Math.floor(random(90, 180));
  this.state = 0;
  this.xSpeed = random(-2, 2);
  this.ySpeed = random(-2, 2);

  this.display = function() {
    if (this.state == 0) {
      fill(128);
      rect(this.xPos, this.yPos, 25, 25);
    } else if (this.state == 1) {
      fill("#DD3243");
      rect(this.xPos, this.yPos, 25, 25);
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
    if ((mouseX > this.xPos) && (mouseX < this.xPos + 25) && (mouseY < this.yPos + 25) && (mouseY > this.yPos) && (this.state==1)) {
      console.log("whack" + frameCount);
      this.state = 0;
      

    }
  }
}

function mousePressed() {
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