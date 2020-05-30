var AWS = require("aws-sdk");
var fs = require("fs");
AWS.config.update({
  region: "",
  endpoint: "",
  accessKeyId: "",
  secretAccessKey: "",
});
var docClient = new AWS.DynamoDB.DocumentClient();
console.log("Importing hotels into DynamoDB. Please wait.");
var hotels = JSON.parse(fs.readFileSync("hotelsData.json", "utf8"));
hotels.forEach(function (hotel) {
  console.log(hotel);
  var params = {
    TableName: "Hotels",
    Item: {
      cityId: hotel.cityId,
      hotelId: hotel.hotelId,
      address: hotel.address,
      picture: hotel.picture,
      rating: hotel.rating,
      price: hotel.price,
      noofroom: hotel.noofroom,
      noofbath: hotel.noofbath,
      numofguest: hotel.numofguest,
      createDate: hotel.createDate,
      contact: hotel.contact,
    },
  };
  docClient.put(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to add Hotel",
        hotel.name,
        ". Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("PutItem succeeded:", hotel.hotelId);
    }
  });
});
