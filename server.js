// Dependencies
// =============================================================
const express = require("express"),
 bodyParser = require("body-parser"),
 htmlRoutes = require('./app/routing/htmlRoutes.js'),
 apiRoutes = require('./app/routing/apiRoutes.js');

const app = express();

//important middleware

//body parser middleware
app.use(bodyParser.urlencoded({extended: true}));
//public folder middleware
app.use(express.static(__dirname + "/public"));
//setting the view to ejs
app.set("view engine", "ejs");



//allows us to use routes
htmlRoutes(app);
apiRoutes(app);

//create a dynamic port for deployement 
var PORT = process.env.PORT || 5555;
app.listen(PORT,()=>{
  console.log(`Server listen at door:${PORT}`);
});