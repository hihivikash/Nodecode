var express = require("express");
var router = express.Router();


router.post("/", function (req, res) {
    res.send('NOT IMPLEMENTED: Book functionality');
});

//get booking history by user id
router.get("/userid/:userId", function (req, res) {
    res.send('NOT IMPLEMENTED: get Book history functionality');
});

//update booking 
router.put("/userid/:userId", function (req, res) {
    res.send('NOT IMPLEMENTED: modify booking functionality');
});





module.exports=router;