var myBall;
var frameCount

function setup() {
  createCanvas(500, 500);

  myBall = new Ball(250, 250);
}

function draw() {
  background(255);
  myBall.display();
  myBall.stateCheck();
}

function Ball(x, y) {
  this.xPos = x;
  this.yPos = y;
  this.state = 0;
  this.xSpeed = random(-2, 2);
  this.ySpeed = random(-2, 2);

  this.display = function() {
    if (this.state == 0) {
      fill(128);
      ellipse(this.xPos, this.yPos, 25, 25);
    } else if (this.state == 1) {
      fill("#DD3243");
      ellipse(this.xPos, this.yPos, 50, 50);
    }
  }

  this.stateCheck = function() {
    if (frameCount % 180 == 0) {
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
}