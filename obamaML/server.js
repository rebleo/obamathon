// http://nodejs.org/api/fs.html
var fs = require('fs');
var http = require('http')
var https = require('https');
var url =  require('url');
var txt;

var credentials = {
  key: fs.readFileSync('my-key.pem'),
  cert: fs.readFileSync('my-cert.pem')
};

//get express & create the app
var express = require('express');
var app = express();

// your express configuration here
// /////////////////
// var server = app.listen( host || port, listen);

app.use(express.static('public'));
var files = fs.readdirSync('bigData');
for (var i = 0; i  < files.length; i++) {
  // Doing this synchronously since it's before the server begins
  txt = fs.readFileSync('bigData/' + files[i]);
	// console.log(txt);
}

console.log('finished all files');
console.log(txt)

// Route for sending all the concordance data
app.get('/all', serveItUp);

//call back- how server talks to http + viewer's browser
// and how express functions within server ("like emit at end, duh")
function serveItUp(request, response){
	response.send(txt);

	var parsedUrl = url.parse(request.url);
	var path = parsedUrl.pathname;
	if (path == "/") {
		path = "index.html";
	}

	fs.readFile(__dirname + path,
		//callback function for reading
		function (error, filePhotos){

			if (error){
				response.writeHead(500);
				return response.end('error loading' + request.url);
			}
			//otherwise send the data, the contents of the file
			response.writeHead(200);
			// Send the entire concordance
			// express automatically renders objects as JSON

			response.end(filePhotos);
			}
		);
		// Send a log message to the console
		console.log("Got a request " + request.url);
}



var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
var host = httpServer.listen(8092);
var port = httpsServer.listen(8093);
console.log('Example app listening at http://' + host + ':' + port);
