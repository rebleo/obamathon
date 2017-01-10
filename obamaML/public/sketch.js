
var bigData = [];
var littleData;
var stringData;


var photoArray = [];
var poemArray = [];
var foundPhoto;
var foundPoem;

function preload(){

	bigData[0] = loadImage("data/bigData/01.jpg");
	bigData[1] = loadImage("data/bigData/02.jpg");
	bigData[2] = loadImage("data/bigData/03.jpg");
	bigData[3] = loadImage("data/bigData/04.jpg");
	bigData[4] = loadImage("data/bigData/05.jpg");
	bigData[5] = loadImage("data/bigData/06.jpg");
	bigData[6] = loadImage("data/bigData/07.jpg");
	bigData[7] = loadImage("data/bigData/08.jpg");
	littleData = loadJSON("data/bigData/bigData.json");


}


function setup(){
	 theCanvas =	createCanvas(windowWidth,windowHeight);
	 background(0,160,0);
	 ellipse(50,50,50,50);

	stringData = littleData.txtData;

	 //Shiffman's bird code for parsing json
	 for (var i = 0; i < stringData.length; i++){
		 createElement('h1', stringData[i].pic);
		 var poems = stringData[i].concepts;
		 for (var j = 0; j < poems.length; j++){
			 createDiv(poems[j])

		 }
	 }


	 makeLearning();


}

function makeLearning(){
	var indexNumber = Math.floor(random(stringData.length - 1));

	console.log( indexNumber )

	for (var r = 0; r < stringData.length - 1; r++) {
	 photoArray = stringData[r].pic;
	 poemArray = stringData[r].concepts;

	 console.log(photoArray + ":" + " " + poemArray)

 //this is not right. need to come back here!
 //11:24 - Jan. 9
	 for (var j = 0; j < photoArray.length - 1; j++){
		 console.log(photoArray[j])
	 }

		//okay this is returning the split string, after declaring array, need to create a file path to LOAD the images, so script knows the string applies to a file it wants to parse.
			// foundPhoto = photoArray [ indexNumber ]
			// console.log(foundImage)

	}


	var number2 = Math.floor(random(bigData.length - 1));
	var pix = bigData[ number2 ];
	image(pix, 100,100,pix.width,pix.height);
}


function draw(){


}
