var AWS = require("aws-sdk");
AWS.config.update({
  region: "",
  endpoint: "",
  accessKeyId: "",
  secretAccessKey: "",
});
var dynamodb = new AWS.DynamoDB();
var params = {
  TableName: "Hotels",
  KeySchema: [
    { AttributeName: "cityId", KeyType: "HASH" },
    { AttributeName: "hotelId", KeyType: "RANGE" },
  ],
  AttributeDefinitions: [
    {
      AttributeName: "cityId",
      AttributeType: "S",
    },
    {
      AttributeName: "hotelId",
      AttributeType: "S",
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
};
dynamodb.createTable(params, function (err, data) {
  if (err) {
    console.error(
      "Unable to create table. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      "Created table. Table description JSON:",
      JSON.stringify(data, null, 2)
    );
  }
});
