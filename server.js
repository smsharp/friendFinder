//Dependencies
var express = require('express');
var bodyParser = require('body-parser');

//Express configurations
var app = express();

//Sets an initial port.
var PORT = process.env.PORT || 8080;

//BodyParser so our server can interpret data sent to it.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Router: points our server to a series of "route" files.
//These routes give our server a "map" of how to respond when users visit or request data from various URLs.
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

//Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});