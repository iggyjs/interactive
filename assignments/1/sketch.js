var colors = ["224,224,224", "242,242,242", "229,229,229"];

function setup() {
  createCanvas(650,450);
}

function draw() {
  noStroke();
  var rand1 = random(0,600);
  var rand2 = random(0,400);
  
  if ((rand1 > 50 && rand1 <80 && rand2 > 50 && rand2 <150) || (rand1 > 80 && rand1 <120 && rand2 > 80 && rand2 < 110) || (rand1 > 120 && rand1 <150 && rand2 > 50 && rand2 < 150) || (rand1 > 190 && rand1 <220 && rand2 > 50 && rand2 < 170) || (rand1 > 220 && rand1 <260 && rand2 > 50 && rand2 < 70) || (rand1 > 220 && rand1 <260 && rand2 > 100 && rand2 < 120) || (rand1 > 220 && rand1 <260 && rand2 > 150 && rand2 < 170) || (rand1 > 300 && rand1 <330 && rand2 > 50 && rand2 < 170) || (rand1 > 330 && rand1 <360 && rand2 > 150 && rand2 < 170)  || (rand1 > 400 && rand1 < 430 && rand2 > 50 && rand2 < 170)|| (rand1 > 430 && rand1 <460 && rand2 > 150 && rand2 < 170) || (rand1 > 500 && rand1 < 530 && rand2 > 50 && rand2 < 170) || (rand1 > 530 && rand1 <560 && rand2 > 50 && rand2 < 70) || (rand1 > 530 && rand1 <560 && rand2 > 150 && rand2 < 170) || (rand1 > 560 && rand1 < 590 && rand2 > 50 && rand2 < 170) || (rand1 > 50 && rand1 <70 && rand2 > 200 && rand2 < 320) || (rand1 > 100 && rand1 <120 && rand2 > 200 && rand2 < 320) || (rand1 > 150 && rand1 <170 && rand2 > 200 && rand2 < 320) || (rand1 > 50 && rand1 <170 && rand2 > 300 && rand2 < 320) || (rand1 > 190 && rand1 <210 && rand2 > 200 && rand2 < 320) || (rand1 > 210 && rand1 <230 && rand2 > 200 && rand2 < 220) || (rand1 > 210 && rand1 <230 && rand2 > 300 && rand2 < 320) || (rand1 > 230 && rand1 <260 && rand2 > 200 && rand2 < 320) || (rand1 > 280 && rand1 <310 && rand2 > 250 && rand2 < 320) || (rand1 > 310 && rand1 <335 && rand2 > 250 && rand2 < 280) || (rand1 > 355 && rand1 <375 && rand2 > 200 && rand2 < 320) || (rand1 > 395 && rand1 <415 && rand2 > 250 && rand2 < 320) || (rand1 > 415 && rand1 <435 && rand2 > 250 && rand2 < 280) || (rand1 > 415 && rand1 <435 && rand2 > 305 && rand2 < 320) || (rand1 > 435 && rand1 <455 && rand2 > 200 && rand2 < 320) || (rand1 > 475 && rand1 <495 && rand2 > 200 && rand2 < 280) || (rand1 > 475 && rand1 <495 && rand2 > 300 && rand2 < 320)){
    //dark grey
    fill(67,67,67);
    ellipse(rand1, rand2, 15, 15);
  } else {
    var randIndex = random(0,colors.length);
    var randColor = colors[parseInt(randIndex)];
    var stringArray = randColor.split(",");
    fill(parseInt(stringArray[0]),parseInt(stringArray[1]), parseInt(stringArray[2]));
    ellipse(rand1, rand2, 12, 12);
  }
    
}