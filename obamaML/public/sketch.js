var picture;
var theCanvas;
var bigData;
var littleData;
var birdData;

var app = new Clarifai.App(
		'Sb8yECwZ6h3c00Oh7bAOzCESq-MVxapDidkcssEc',
		'yMtPNkdWeZtKIH2suMv0893R4RA4BeB2dYbB8WXn');


function preload(){
	picture = loadImage('data/6600.jpg');
	// Just all the data is loaded from the server
	littleData = loadJSON('/data/littleData.json');
	birdData = loadJSON('/data/birds.json');
}

// var pictureData = theCanvas.toDataURL("data/6600.jpg",0.2);

function setup(){
 theCanvas =	createCanvas(windowWidth,windowHeight);
	var birds = birdData.birds;
	for (var i = 0; i < birds.length; i++){
		createElement('h1', birds[i].family);

		var members = birds[i].members;
		for ( var j = 0; j < members.length; j++){
			createDiv(members[j])
		}
	}

	// console.log(birdData)
	// console.log( app )
	// console.log(picture)
}


function draw(){
	background(0,160,0);
	image(picture, 100,100);
	fill(littleData.r,littleData.g, littleData.b);
	text(littleData.name, 10,10)
		var bird = birdData.birds[1].members[2];
		text(bird, 10, 100)

}
