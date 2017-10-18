var express = require("express");

var path = require("path");

var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var eventsArr = ["Dash for Donuts 2017", "Puppy Run 2017", "Bacon Blitz 2017", "Dash for Dads 2017"];
var randEvent = Math.floor(Math.random() * (eventsArr.length - 1) + 1);
var runnersArr = [
    {team: "Adaptive Running Academy",
    name: "Stan Ong"},
    {team: "Team Bestie",
    name: "Nancy Trejo"},
    {team: "HDMRTT",
    name: "Tonja Parkin"},
]
var randRunner = Math.floor(Math.random() * (runnersArr.length - 1) + 1);
var goalsArr = [];


app.get('/', function(req, res)
{
    
    console.log(goalsArr);
    var response = {
        event: eventsArr[randEvent],
        runner: runnersArr[randRunner],
        goals: goalsArr
    }
    res.render("index", {response: response});
});

app.post('/newgoal', function(req, res)
{
    goalsArr.push({
        type: req.body.type,
        custom: req.body.custom,
        comment: req.body.comment
    })
    res.redirect('/');
});

app.listen(8000, function() {
 console.log("listening on port 8000");
});
