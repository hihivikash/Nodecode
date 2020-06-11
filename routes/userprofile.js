var express = require("express");
var router = express.Router();

router.get("/:userId", function (req, res) {
  res.send("NOT IMPLEMENTED: User Profile functionality");
});

router.post("/userDetail/:userid", function (req, res) {
  res.send("NOT IMPLEMENTED: User Profile update functionality");
});

module.exports = router;
