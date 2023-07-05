const express = require("express");
const loginController = require("../controllers/loginController");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("login");
});

module.exports = router;
