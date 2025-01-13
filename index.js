// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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

app.get("/api", (req, res) => {
  const date = new Date();
  const unixTimestamp = date.getTime();
  const utcTimestamp = date.toUTCString();

  const dateReturnObj = {
    "unix": unixTimestamp,
    "utc": utcTimestamp
  }

  res.status(200).send(dateReturnObj);
})

app.get("/api/:date", (req, res) => {
  let date;

  // If date param can be interpreted as a number, convert to number
  if (!isNaN(req.params.date)) {
    date = new Date(Number(req.params.date));
  } else {  // If cannot be converted, leave as string
    date = new Date(req.params.date);
  }

  // If date is invalid
  if (isNaN(date.getTime())) return res.status(400).send({ "error": "Invalid Date" })

  const unixTimestamp = date.getTime();
  const utcTimestamp = date.toUTCString();

  const dateReturnObj = {
    "unix": unixTimestamp,
    "utc": utcTimestamp
  }

  res.status(200).send(dateReturnObj);
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
