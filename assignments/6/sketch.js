var world;
var rooks = [];
var removeSound;

function preload(){
	removeSound = loadSound("sounds/gameSound.mp3");
}

function setup() {
	noCanvas();
	noiseDetail(24);
	world = new World('VRScene');

	var g = new Plane({	
						x:0, 
						y:0,
						z:0,
						width:50,
						height:50,
						asset: 'wood',
						repeatX: 100,
						repeatY: 100,
						rotationX:-90,
						metalness:0.25
					});
	
	world.add(g);

	var moon = new DAE({
		asset: 'moon',
		scaleX:250,
		scaleY:250,
		scaleZ:250
	});
	world.add(moon);
	



	var iters = random(0, 50);

	for (var i = 0; i < iters; i++){
		r1 = new Rook(random(0, 50), 10, -1 * random(-50,50));
		rooks.push(r1);
	}

	
}

function draw() {
	for (var i = 0; i < rooks.length; i++){
		rooks[i].move();
	}

	if (mouseIsPressed)
		world.moveUserForward(0.05);
}


function Rook(x,y,z){
	this.x = x;
	this.y = y;
	this.z = z;

	var c1 = new Cylinder({x:x, y:y, z:z, width:0.01, height:4, depth:0.01, red:255, green:255, blue:255, 
				clickFunction: function(thisObj) {
					world.remove(thisObj);
					world.remove(s1);
					world.remove(t1);
					world.remove(arm1);
					world.remove(arm2);
					removeSound.play();
				} });
	var s1 = new Sphere({x:x, y:y+3, z:z, width:0.01, height:4, depth:0.01, red:255, green:255, blue:255, 
				clickFunction: function(thisObj) {
					world.remove(thisObj);
					world.remove(t1);
					world.remove(c1);
					world.remove(arm1);
					world.remove(arm2);
					removeSound.play();
				} });	
	var t1 = new Ring({x:x, y:y+4.5, z:z, width:0.01, height:4, depth:0.01, rotationX: 100, red:255, green:255, blue:255, 
				clickFunction: function(thisObj) {
					world.remove(thisObj);
					world.remove(s1);
					world.remove(c1);
					world.remove(arm1);
					world.remove(arm2);
					removeSound.play();
				} });	
	
	var arm1 =  new Box({x:x-1, y:y+1, z:z, width:1, height:1, depth:1, red:255, green:255, blue:255, 
				clickFunction: function(thisObj) {
					world.remove(thisObj);
					world.remove(s1);
					world.remove(c1);
					world.remove(t1);
					world.remove(arm2);
					removeSound.play();
				} });	

	var arm2 =  new Box({x:x+1, y:y+1, z:z, width:1, height:1, depth:1, red:255, green:255, blue:255, 
			clickFunction: function(thisObj) {
				world.remove(thisObj);
				world.remove(s1);
				world.remove(c1);
				world.remove(t1);
				world.remove(arm1);
				removeSound.play();
			} });	

	world.add(c1);
	world.add(s1);
	world.add(t1);
	world.add(arm1);
	world.add(arm2);

	this.move = function(){

		var noiseMovement = map(noise(random(0, 3)), 0, 1, -0.1, 0.1);
		this.x += noiseMovement;
		this.z += noiseMovement;

		c1.setPosition(this.x, this.y, this.z);
		s1.setPosition(this.x, this.y+3, this.z)
		t1.setPosition(this.x, this.y+4.5, this.z);
		arm1.setPosition(this.x-1, this.y+1, this.z);
		arm2.setPosition(this.x+1, this.y+1, this.z);
	}
}