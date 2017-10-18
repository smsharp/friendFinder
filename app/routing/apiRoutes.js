//Dependencies
var path = require('path');

//Load Data: Linking our routes to a series of "data" sources.
//These data sources hold arrays of information on friends.
var friends = require("../data/friends.js");

//Routing
module.exports = function(app) {
  
  //API GET Requests
  //Handles when users "visit" a page.
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  //API POST Requests: Handles when a user submits a form and thus submits data to the server.
  //In each of the below cases, when a user submits form data (a JSON object)
  //...the JSON is pushed to the appropriate JavaScript array. Then the server saves the data to the friends array)
  app.post("/api/friends", function(req, res) {

    //Capture the user input object
    var userData = req.body;

    var userResponses = userData.scores;

    //Determine best friend match
    var matchName = '';
    var matchImage = '';
    var totalDifference = 100;

    //Examine all existing friends in the list
    for (var i = 0; i < friends.length; i++) {

      //Compare the differenes for each question
      var difference = 0;
      for (var j = 0; j < userResponses.length; j++) {
        difference += Math.abs(friends[i].scores[j] - userResponses[j]);
      }

      //If smallest difference, record the friend match
      if (difference < totalDifference) {

        totalDifference = difference;
        matchName = friends[i].name;
        matchImage = friends[i].photo;
      }
    }

    //Add new user friend. At later point find a way to validate users so they cannot keep submitting.
    friends.push(userData);

    //Send appropriate response
    res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
  });

};