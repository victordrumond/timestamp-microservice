// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint
app.get("/api/:date_string", (req, res) => {
  let dateString = req.params.date_string;
  if (isNaN(parseFloat(dateString))) {
    res.json({error: "Invalid Date"});
  } else if ((/^[0-9]+$/).test(dateString)) {
    res.json({"unix": parseFloat(dateString), "utc": new Date(parseFloat(dateString)).toUTCString()});
  } else {
    res.json({"unix": Date.parse(dateString), "utc": new Date(dateString).toUTCString()});
  };
});

// API endpoint if date parameter is left empty
app.get("/api/", (req, res) => {
  res.json({"unix": (+ new Date()), "utc": new Date().toUTCString()});
});

// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
