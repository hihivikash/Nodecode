var express = require("express");
var router = express.Router();
var AWS = require("aws-sdk");
const { addDays, format } = require('date-fns'); 
AWS.config.update({
    region: "ap-south-1",
    endpoint: "http://localhost:8000",
    accessKeyId: "fakeid",
    secretAccessKey: "fakekey",
});

var dtCount=0;
var docClient = new AWS.DynamoDB.DocumentClient();

router.get("/City/:cityid/FromDt/:fromDt/ToDt/:toDt/nbrofguest/:nbrofguest", function (req, res) {
    
    console.log("Search Request: " + JSON.stringify(req.params));
    var HotelList,HotelBookByCityDt;

   getHomeStayByCity(req.params.cityid,function(data)
    {
        HotelList=data;
        var count=0;
        dtCount=0;
         getHomeStayBookingByCityDate(req,function(data)
          { 
        count=count+1;
        HotelList.Items.forEach(function(item) {
            if(item.nbrofguest >= req.params.nbrofguest && (item.valid== undefined || item.valid!=false) )
            {
          //  console.log(" -", item.City + ": " + item.HotelNm+ ":"+(data.Items.length>0 ?data.Items[0].UserId:'No Record'));
           if(data.Items.filter(bookItem => (item.HotelNm === bookItem.UserId)).length >0)
            item.valid=false;
            }
            else
            item.valid=false;
                    });
  
                    if (count===dtCount)
                    {
                    console.log("Search Result: " + JSON.stringify(HotelList.Items));
                    res.send(HotelList.Items.filter(bookItem => (bookItem.valid !=false || bookItem.valid== undefined)));
                }
         })
      
    });
});

var getHomeStayByCity=function (city,callback)
{
   
    var params = {
        TableName : "HomeStay",
        KeyConditionExpression: "#PK = :city",
        ExpressionAttributeNames:{
            "#PK": "PK"
        },
        ExpressionAttributeValues: {
            ":city":  "City#"+city
    
        }
    };
  
    docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } 
        callback(data);
    });
   
}

var getHomeStayBookingByCityDate=function (req,callback)
{
    var fromdate = new Date(req.params.fromDt);
    var todate = new Date(req.params.toDt);
    
    var dateList  =[];
   
    while(todate>=fromdate)
    {
        dateList.push(format(fromdate, 'ddMMyyyy'));
        fromdate=addDays(fromdate,1);
        dtCount=dtCount+1;
      
    }

    dateList.forEach(function(item)
    {
    var params = {
        TableName : "HomeStayBookCalendar",
        KeyConditionExpression: "#PK = :city",
        ExpressionAttributeNames:{
            "#PK": "PK"
        },
        ExpressionAttributeValues: {
      //     ":city":  "City#"+req.params.cityid+"#"+ item
      ":city":  "City#"+ item
        }
    };
  
    docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } 
        callback(data);
    });  
});
   
}

module.exports=router;