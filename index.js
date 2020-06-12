var express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs');

var app = express();
app.use(bodyParser.json());



var server = app.listen(process.env.PORT , function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});

app.get('/', function (req, res) {
    res.send('/saveTime to save the current time. /getTime to get the saved time.');
});

app.get('/saveTime', function (req, res) {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    var text = date + " " + time;

    fs.writeFile("time.txt", text, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The time was saved !");
    });

    res.end(text + " was saved !");
});

app.get('/getTime', function (req, res) {
    fs.readFile('time.txt', 'utf8', function (err, data) {
        res.end(data);
    });
    console.log("Saved time was retrieved !");
})

var Rooms = [];

var Bookings = [];

app.post('/addRoom', function (req, res) {
    Rooms.push(req.body);
    res.end("Added Room");
});

app.get('/showRooms', function (req, res) {
    res.end(JSON.stringify(Rooms));
});

app.post('/bookRoom', function (req, res) {
    let book = req.body;
    let flag = true;
    for (let i = 0; i < Bookings.length; i++) {
        if (Bookings[i].date === book.date && Bookings[i].roomID === book.roomID) {
            flag = false;
            break;
        }
    }

    if (flag) {
        Bookings.push(book);
        res.end("Booking done");
    }
    else {
        res.end("Booking unavailable");
    }
});

app.get("/showBookings", (req, res) => {
    res.end(JSON.stringify(Bookings));
});