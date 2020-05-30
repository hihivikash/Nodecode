var express = require("express");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var AWS = require("aws-sdk");
var app = express();
app.listen(3000, () => console.log("hotels API listening on port 3000!"));
AWS.config.update({
  region: "",
  endpoint: "",
  accessKeyId: "",
  secretAccessKey: "",
});
var docClient = new AWS.DynamoDB.DocumentClient();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("view engine", "jade");
app.get("/", function (req, res) {
  res.send({ title: "hotels API Entry Point" });
});

app.get("/hotels/:cityId/:hotelId", function (req, res) {
  var cityID = req.url.slice(8, 13);
  var hotelID = req.url.slice(14);
  const tableName = "Hotels";
  console.log(req.url);
  console.log(cityID);
  console.log(hotelID);
  var params = {
    Key: {
      cityId: cityID,
      hotelId: hotelID,
    },
    TableName: "Hotels",
  };
  docClient.get(params, function (err, data) {
    if (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
      console.log("Query succeeded.");
      res.send(data);
    }
  });
});
