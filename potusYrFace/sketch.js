//     ( POTUS yrFace )
// rebecca (marks) leopold, 2017
////also thx zac, kevin, jasmine, aaron for letting me "share" yr idea.
//http://www.potatoyourface.com/
//using clmtrackr - https//github.com/auduno/clmtrackr

var theCanvas;
var theContxt;
var theTitleCanvas;
var theTitleText;

var meFace;
var feelings = ["angry", "sad", "suprised", "happy"]

var ec = new emotionClassifier();
ec.init(emotionModel);
var emotionData = ec.getBlank();

var emojiGo = function() {

/////// communication / compatibility jig /////
	window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

	// The video element on the page to display the webcam
	meFace = document.getElementById('selfieVideo');

	// if we have the method
	if (navigator.getUserMedia) {
		navigator.getUserMedia({video: true}, function(stream) {
				meFace.src = window.URL.createObjectURL(stream) || stream;
				meFace.play();
				//call draw after get video info
				draw();

			}, function(error) {alert("Failure " + error.code);});
	}

////////////// make the page //////////////////
	theCanvas = document.getElementById('thecanvas1');
 	theContxt = theCanvas.getContext('2d');
	theTitleCanvas = document.getElementById('thecanvas2');
	theTitleText = theTitleCanvas.getContext('2d');

	theTitleText.fillStyle = "green";
	theTitleText.fillRect(0, 0, theTitleCanvas.width, theTitleCanvas.height);
	// theTitleText.font = "20px Georgia";
	// theTitleText.fillStyle = "blue";
	// theTitleText.fillText("Obama Looking...",50,40);

//init the CLM tracker
	ctracker = new clm.tracker();
	ctracker.init(pModel);
	ctracker.start(meFace);

} // end of emojiG0 == init()


var draw = function() {
//ANYTHING DRAWN ON CANVAS WILL BE EMITTED YOU FOOL!
 	theContxt.drawImage(meFace,0,0,meFace.width,meFace.height);
	var title = document.getElementById('obama');
	theTitleText.drawImage(title, 35,100);
	var happy = document.getElementById('word4');
	theTitleText.drawImage(happy, 100, 200);
	var sad = document.getElementById('word2');
	theTitleText.drawImage(sad, 250,  200);
	var suprised = document.getElementById('word3');
	theTitleText.drawImage(suprised, 400,  200);
	var mad = document.getElementById('word1');
	theTitleText.drawImage(mad, 550,  200);

	theContxt.drawImage(title, 0, 410)
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
						// var myFeeling = feelings[j];
						// console.log(myFeeling)
						theContxt.drawImage(myEmo,positions[i][0]-50, positions[i][1]-200);
						// var feelingTitle = theTitleText.fillText(myFeeling, 225, 40 + (j * 40));

					} else {
						// feelingTitle = theTitleText.fillText(" ",225,40);
						// console.log("whatever")

					}
				}
			}

		}
	 }
///whatever the canvas state is at this point will be sent over the network
 	var meData = theCanvas.toDataURL('image/jpeg', 0.2);
 	setTimeout(draw,10);
}
window.addEventListener('load', emojiGo);
