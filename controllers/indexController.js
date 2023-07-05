const { db } = require("../connection");

exports.index = async (req, res) => {
  try {
    const sqlQuery = "SELECT * from user";
    db.query(sqlQuery, (err, result) => {
      if (err) {
        console.log(err);
        return res.redirect("/register");
      }
      res.render("index", { users: result });
    });
  } catch (e) {
    console.log(e);
  }
};
