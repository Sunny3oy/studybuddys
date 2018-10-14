/*eslint-disable no-unused-params */
var express = require('express');
var firebase = require('firebase');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json()); //need to parse HTTP request body

var config = {
    apiKey: "AIzaSyCy4bxZcJyXM9JJ3dkfOYySAmTpt6yIguo",
    authDomain: "studybuddy-219221.firebaseapp.com",
    databaseURL: "https://studybuddy-219221.firebaseio.com",
    projectId: "studybuddy-219221",
    storageBucket: "studybuddy-219221.appspot.com",
    messagingSenderId: "520493795861"
  };
firebase.initializeApp(config);
  
//Fetch instances
app.get('/', function (req, res) {

	console.log("HTTP Get Request");
	//creates the table Users
	var userReference = firebase.database().ref("/Users/");

	//Attach an asynchronous callback to read the data
	userReference.on("value", 
			  function(snapshot) {
					console.log(snapshot.val());
					res.json(snapshot.val());
					userReference.off("value");
					}, 
			  function (errorObject) {
					console.log("The read failed: " + errorObject.code);
					res.send("The read failed: " + errorObject.code);
			 });
});

//Create new instance
app.put('/', function (req, res) {

	console.log("HTTP Put Request");
//below is what is passed into from the json file
	var userName = req.body.UserName;
	var name = req.body.Name;
	var age = req.body.Age;
//reference path will tell us where to save the data to
	var referencePath = '/Users/'+userName+'/';
//userRef uses the refer path above.
	var userReference = firebase.database().ref(referencePath);
//now we can use the above to set the parameters
	userReference.set({Name: name, Age: age}, 
				 function(error) {
					if (error) {
						res.send("Data could not be saved." + error);
					} 
					else {
						res.send("Data saved successfully.");
					}
			});
});

//Update existing instance
app.post('/', function (req, res) {

	console.log("HTTP POST Request");

	var userName = req.body.UserName;
	var name = req.body.Name;
	var age = req.body.Age;

	var referencePath = '/Users/'+userName+'/';
	var userReference = firebase.database().ref(referencePath);
	userReference.update({Name: name, Age: age}, 
				 function(error) {
					if (error) {
						res.send("Data could not be updated." + error);
					} 
					else {
						res.send("Data updated successfully.");
					}
			    });
});

//Delete an instance
app.delete('/', function (req, res) {

   console.log("HTTP DELETE Request");
   //todo
});

var server = app.listen(8080, function () {
  
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port);
});