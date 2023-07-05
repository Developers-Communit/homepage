const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { db } = require("../connection");

exports.registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.render("register", { errors: errorMessages });
    }

    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const sqlQuery =
      "INSERT INTO user (username, email, password) VALUES (?, ?, ?)";
    db.query(sqlQuery, [username, email, hashPassword], (err, result) => {
      if (err) {
        console.log(err);
        return res.redirect("/register");
      }
      res.redirect("/login");
    });
  } catch (error) {
    console.log(error);
    res.redirect("/register");
  }
};
