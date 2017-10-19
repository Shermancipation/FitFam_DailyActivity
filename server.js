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

// Main index page route that checks for activities and calculates current total distance and distance to go and adds them to relevant goal object in goals array 
app.get('/', function(req, res)
{
    var activityDistance = 0;
    var distanceToGo = 0;

    for(var i = 0; i < goalsArr.length; i++)
        {
            for(var j = 0; j < goalsArr[i].activities.length; j++)
                {
                    activityDistance = activityDistance + parseFloat(goalsArr[i].activities[j].distance);
                }
            if(activityDistance >= parseFloat(goalsArr[i].distance))
                {
                    goalsArr[i].completed = true;
                    // Completed attribute defaults to false and updates to true once total activity distance eclipses event distance - triggers conditionals on index page
                }
            goalsArr[i].activityDistance = activityDistance;
            goalsArr[i].distanceToGo = goalsArr[i].distance - activityDistance;
            activityDistance = 0;
        }
    // Event and runner response attributes are simply to populate page header for unique feel.  The goals array contains most necessary functionality info
    var response = {
        event: eventsArr[randEvent],
        runner: runnersArr[randRunner],
        goals: goalsArr,
    }
    res.render("index", {response: response});
});

app.post('/newgoal', function(req, res)
{
    // Conditional checks to add appropriate distance to goals object based on type selected
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
    // Building goal object to be added to goals array
    goalsArr.push({
        type: req.body.type,
        distance: distance,
        comment: req.body.comment,
        completed: false,
        activities: [],
        activityDistance: 0,
        distanceToGo: 0
    })
    res.redirect('/');
});

app.post('/newactivity', function(req, res)
{
    // Building activity object to add to activities array within goal object
    goalsArr[req.body.goalIdx].activities.push({
        date: req.body.date,
        distance: req.body.distance,
        comment: req.body.comment
    })
    res.redirect('/');
});

app.listen(8000, function() {
 console.log("listening on port 8000");
});
