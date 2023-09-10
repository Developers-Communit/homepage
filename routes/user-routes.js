const express = require("express");
const router = express.Router();

const userController = require("../controllers/user-controller");

// MIDDLEWARE
const { verifyToken } = require("../middlewares/auth-middleware");

// router.get("/", verifyToken, userController.getUser);

router.get("/", verifyToken, (req, res) => {
  const islogin = req.session.islogin;
  res.render("home", { login: islogin });
});

module.exports = router;
