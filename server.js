const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const registerRoutes = require("./routes/registerRoutes");
const indexRoutes = require("./routes/indexRoutes");
const loginRoutes = require("./routes/loginRoutes");

const app = express();
app.set("view engine", "ejs");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use("/", indexRoutes);
app.use("/register", registerRoutes);
app.use("/login", loginRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
