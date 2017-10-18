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
    var activityDistance = 0;
    for(var i = 0; i < goalsArr.length; i++)
        {
            for(var j = 0; j < goalsArr[i].activities.length; j++)
                {
                    var activityDistance = activityDistance + parseInt(goalsArr[i].activities[j].distance);
                }
            if(activityDistance >= parseInt(goalsArr[i].distance))
                {
                    goalsArr[i].completed = true;
                }
        }
    var response = {
        event: eventsArr[randEvent],
        runner: runnersArr[randRunner],
        goals: goalsArr
    }
    console.log(goalsArr);
    res.render("index", {response: response});
});

app.post('/newgoal', function(req, res)
{
    var distance = '';
    if(req.body.type == "5k")
        {
            distance = '3.1';
        }
    else if(req.body.type == "10k")
        {
            distance = '6.2';
        }
    else if(req.body.type == "halfMarathon")
        {
            distance = '13.1';
        }
    else
        {
            distance = req.body.custom;
        }
    goalsArr.push({
        type: req.body.type,
        distance: distance,
        comment: req.body.comment,
        completed: false,
        activities: []
    })
    res.redirect('/');
});

app.post('/newactivity', function(req, res)
{
    console.log(req.body.goalIdx);
    goalsArr[req.body.goalIdx].activities.push({
        date: req.body.date,
        distance: req.body.distance,
        comment: req.body.comment
    })
    for(var idx in goalsArr[req.body.goalIdx].activities){
        console.log(goalsArr[req.body.goalIdx].activities[idx]);
    }
    res.redirect('/');
});

app.listen(8000, function() {
 console.log("listening on port 8000");
});
