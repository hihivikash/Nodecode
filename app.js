var express = require("express");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var AWS = require("aws-sdk");
var app = express();

require("dotenv/config");

var hotelProfileRoute = require("./routes/hotelprofile");
var searchRoute = require("./routes/search");
var bookingRoute = require("./routes/booking");
// var userProfileRoute = require("./routes/useraProfile");
var userProfileRoute = require("./routes/userprofile");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/hotel", hotelProfileRoute);
app.use("/search", searchRoute);
app.use("/book", bookingRoute);
app.use("/user", userProfileRoute);
app.get("/", function (req, res) {
  res.send('<h1 style="color:blue;">You have reached Hotel Entry Points</h1> \n');
});

app.listen(process.env.PORT, () =>
  console.log("hotels API listening on port 3000!")
);
