var Clarifai = require('clarifai');
var theConcepts;

// instantiate a new Clarifai app passing in your clientId and clientSecret
var app = new Clarifai.App(
	'Sb8yECwZ6h3c00Oh7bAOzCESq-MVxapDidkcssEc',
	'yMtPNkdWeZtKIH2suMv0893R4RA4BeB2dYbB8WXn'
);

// predict the contents of an image by passing in a url
app.models.predict(Clarifai.GENERAL_MODEL, "http://site.rebeccaleopold.com/wp-content/uploads/2013/09/reb2011.jpg").then(
	handleResponse,
	handleError
);

function handleResponse(response){
	// var theData = JSON.stringify(response);
	var theData = response.outputs;

	for (var i = 0; i < theData.length; i++){
		theConcepts = theData[i].data;
	}

	var theWords = theConcepts.concepts;
	for (var i = 0; i < theWords.length; i++){
		console.log(theWords[i].name);
	}
		// console.log(theConcepts.concepts.length)
};

function handleError(err){
	console.log('promise error:', err);
};
