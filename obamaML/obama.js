
var Clarifai = require('clarifai');
var theConcepts;
var theWords = [];

// instantiate a new Clarifai app passing in your clientId and clientSecret
var app = new Clarifai.App(
	'',
	''
);

		// predict the contents of an image by passing in a url
		app.models.predict(Clarifai.GENERAL_MODEL, "http://oldobjectsnewideas.com/bigData/2.jpg").then(
			handleResponse,
			handleError
		);


	function handleResponse(response){
		// var theData = JSON.stringify(response);
		var theData = response.outputs;

		for (var i = 0; i < theData.length; i++){
			theConcepts = theData[i].data;
		}

	 var words = theConcepts.concepts;
		for (var i = 0; i < words.length; i++){
			theWords.push(words[i].name);

		}

		console.log(theWords)

	};

	function handleError(err){
		console.log('promise error:', err);
	};
