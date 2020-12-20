var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
// var sendingForm = require('./../client/champ.jsx');
// var history = require("./../leagueHistory/leagueHistoryController.js");

// app.set('view engine', 'jsx');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "./../")));

app.get("/", function(req, res) {
  // res.setHeader('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname + "./../index.html"));
});

// app.post("/", history.game, history.results);

app.listen(3000);
