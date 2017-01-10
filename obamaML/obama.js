

var Clarifai = require('clarifai');
var theDataArray = [];
var theConcepts;
var theWords = [];
var theWordsData = [];
// var url = "http://oldobjectsnewideas.com/bigData/0";
var url = "http://oldobjectsnewideas.com/bigData/";

var picNumber;

// instantiate a new Clarifai app passing in your clientId and clientSecret
var app = new Clarifai.App(
	'',
	''
);


// j refers to the index in the array of arrays of image:concept pairs.
// so: {}"image1" : "all the data re: image 1"]
app.models.predict(Clarifai.GENERAL_MODEL, url + "12.jpg").then(
	handleResponse,
	handleError
);
// for (j = 0; j < 4; j++){
// 	// predict the contents of an image by passing in a url
// 	app.models.predict(Clarifai.GENERAL_MODEL, url + (j + 1) + ".jpg").then(
// 		handleResponse,
// 		handleError
// 	);
//
// }

	function handleResponse(response){
		// var theData = JSON.stringify(response);
		var theData = response.outputs;

		// for the length of the rawData, go through and find the ML data

		for (var i = 0; i < theData.length; i++){
			theConcepts = theData[i].data;
		}

		// console.log(typeof theConcepts)
		var words = theConcepts.concepts;
		// console.log(words)

		for (var i = 0; i < words.length; i++){
			console.log("'" +words[i].name + "'" );

		}
		// theWordsData.push(theWords);
		// console.log(theWords)


	};

	function handleError(err){
		console.log('promise error:', err);
	};



	// this is how images come from clarifai, when i iterate through index of webpages.
	// id = the unique image fed
	//
	// //  console.log(theData)
	// [ { id: 'a9313bf751ae4b6db53ab415d9ab611c',
	//     status: { code: 10000, description: 'Ok' },
	//     created_at: '2017-01-10T00:41:41Z',
	//     model:
	//      { name: 'general-v1.3',
	//        id: 'aaa03c23b3724a16a56b629203edc62c',
	//        created_at: '2016-03-09T17:11:39Z',
	//        app_id: null,
	//        output_info: [Object],
	//        model_version: [Object] },
	//     input: { id: 'a9313bf751ae4b6db53ab415d9ab611c', data: [Object] },
	//     data: { concepts: [Object] } } ]
	// [ { id: 'd12d2339d9364cd19b74ddaca8dfebb2',
	//     status: { code: 10000, description: 'Ok' },
	//     created_at: '2017-01-10T00:41:42Z',
	//     model:
	//      { name: 'general-v1.3',
	//        id: 'aaa03c23b3724a16a56b629203edc62c',
	//        created_at: '2016-03-09T17:11:39Z',
	//        app_id: null,
	//        output_info: [Object],
	//        model_version: [Object] },
	//     input: { id: 'd12d2339d9364cd19b74ddaca8dfebb2', data: [Object] },
	//     data: { concepts: [Object] } } ]
	//
	// //{
