// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var htmlRoutes = require('./app/routing/htmlRoutes.js')
var apiRoutes = require('./app/routing/apiRoutes.js')

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 5000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
// =============================================================
htmlRoutes(app);
apiRoutes(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
	console.log("App listening on PORT " + PORT);
});
