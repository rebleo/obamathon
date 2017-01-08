// The 'fs' (file system) module allows us to read and write files
// http://nodejs.org/api/fs.html
// This is how we'll load data
var fs = require('fs');
// Using express: http://expressjs.com/
var express = require('express');
// Create the app
var app = express();

// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 4000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

// This is for hosting files
// Anything in the public directory will be served to viewer
// We could also add routes, but aren't doing so here
app.use(express.static('public'));

// And we'll look at all files in the photo directory
var files = fs.readdirSync('bigData');
console.log(files)
// Read all the files
for (var i = 0; i  < files.length; i++) {
  // Doing this synchronously since it's before the server begins
  var txt = fs.readFileSync('bigData/'+files[i]);

}

// Route for sending all the concordance data
app.get('/all', showAll);

// Callback
function showAll(req, res) {
  // Send the entire concordance
  // express automatically renders objects as JSON
  res.send(txt);
}
