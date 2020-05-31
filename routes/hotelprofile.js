var express = require("express");
var router = express.Router();


router.get("/:hotelid", function (req, res) {
    res.send('NOT IMPLEMENTED: hotel profile');
});

router.post("/", function (req, res) {
    res.send('NOT IMPLEMENTED: hotel creation ');
});


module.exports=router;