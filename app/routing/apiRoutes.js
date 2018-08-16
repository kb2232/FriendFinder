

var apiRoutes = function(app) {
    // Store (DATA)
    // =============================================================
    var FRIENDS = require("../data/friends.js");

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
}

module.exports = apiRoutes;