//     Obama Yr Face
// rebecca (marks) leopold, 2017
// http://rml444.itp.io/obamaYrFace
// inspired by: http://www.potatoyourface.com/
// thx Zac Coble, Kevin Steirnweis, Jasmine Soltani & Aarón Moraga  Montoya
// using clmtrackr - https//github.com/auduno/clmtrackr

var theCanvas;
var theContxt;
var theTitleCanvas;
var theTitleTxt;

var meFace;

var ec = new emotionClassifier();
ec.init(emotionModel);
var emotionData = ec.getBlank();

var emojiGo = function() {
//Get User Media accesses the user's webcam
//https://itp.nyu.edu/~sve204/liveweb_fall2016/week4.html
	window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

	// The video element on the page to display the webcam
	meFace = document.getElementById('selfieVideo');

	// if we have the method
	if (navigator.getUserMedia) {
		navigator.getUserMedia({video: true}, function(stream) {
				meFace.src = window.URL.createObjectURL(stream) || stream;
				meFace.play();
				//call draw - all the Canvas events, after the video has loaded so the data has a place to go.
				draw();

			}, function(error) {alert("Failure " + error.code);});
	}

////////////// make the page //////////////////
	theCanvas = document.getElementById('thecanvas1');
 	theContxt = theCanvas.getContext('2d');
	theTitleCanvas = document.getElementById('thecanvas2');
	theTitleTxt = theTitleCanvas.getContext('2d');

	theContxt.fillStyle = "green";
	theContxt.fillRect(0, 0, theCanvas.width, theCanvas.height);
	theTitleTxt.fillStyle = "green";
	theTitleTxt.fillRect(0, 0, theTitleCanvas.width, theTitleCanvas.height);


//init the CLM tracker
	ctracker = new clm.tracker();
	ctracker.init(pModel);
	ctracker.start(meFace);

} // end of emojiG0 == init()


var draw = function() {
//draw the image to the canvas
 	theContxt.drawImage(meFace,0,0,meFace.width,meFace.height);
	var title = document.getElementById('obama');

	theContxt.drawImage(title, 0, 425)
	var emo = document.getElementById('emo');
	theTitleTxt.drawImage(emo, 0,0);
//all this clm tracker emotion stuff
	var cp = ctracker.getCurrentParameters();
	 //angry, sad, suprised, happy
	var expression = ec.meanPredict(cp);
	var positions = ctracker.getCurrentPosition();

	//for the position of yr face
	if (positions.length > 0) {
		  // console.log(positions);
		if (expression) {
			//this part needs to be cleaned up/fixed
			for (var i = 0; i < 1; i++) {
				for (var j = 0; j < expression.length; j++){
					if (expression[j].value > 0.4) {
						var myEmo = document.getElementById('icon'+(j+1));
						// console.log(j);
						theContxt.drawImage(myEmo,positions[i][0]-50, positions[i][1]-200);

					} else {
						// feelingTitle = theTitleText.fillText(" ",225,40);
						// console.log("whatever")

					}
				}
			}

		}
	 }
	//turn the video data into image data
 	var meData = theCanvas.toDataURL('image/jpeg', 0.2);
	//draw those images ever 1/10 of second so appears "live"
 	setTimeout(draw,10);
}
//when the page loads, call the program to run
window.addEventListener('load', emojiGo);
