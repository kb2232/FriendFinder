// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 5000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Store (DATA)
// =============================================================
var FRIENDS = require("./app/data/friends.js");

// Routes
// =============================================================

/**
 * HTML Routes
 * Basic route that sends the user first to the AJAX Page
 */
app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "./app/public/home.html"));
});

app.get("/survey", function (req, res) {
	res.sendFile(path.join(__dirname, "./app/public/survey.html"));
});

/**
 * API GET Routes
 * Displays all characters
 */
app.get("/api/friends", function (req, res) {
	return res.json(FRIENDS);
});

/**
 * POST Routes
 * req.body hosts is equal to the JSON post sent from the user
 * This works because of our body-parser middleware
 */
app.post("/api/friends", function (req, res) {
// app.post("/survey", function (req, res) {
	var mySurvey = req.body;
	res.json(matchFriend(mySurvey));
});

var matchFriend = function (arg) {
	var myFriend = null;
	var total = 50;
	// count = 90;
	for (var i = 0; i < FRIENDS.length; i++) {
		var tempTotal = 0;
		for (var j = 0; j < 10; j++) {
			diff = parseInt(FRIENDS[i].scores[j]) - parseInt(arg.scores[j]);
			if (diff < 0) {
				diff = -(diff);
			}
			tempTotal += diff;
		}
		if (tempTotal < total) {
			total = tempTotal;
			// console.log("diff:",total);
			myFriend = FRIENDS[i];
			// console.log(myFriend);
		} else if (total === 0) {
			return myFriend;
		}
	}
	// console.log(myFriend);
	return myFriend;
}

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
	console.log("App listening on PORT " + PORT);
});
