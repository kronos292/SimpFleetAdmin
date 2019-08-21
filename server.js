const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");

/* routes api */
const users = require("./routes/api/users");
const jobs = require("./routes/api/jobs");

/* DB config */
const db = require("./config/keys").mongoURI;

/* connect to mongoDB */
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Database Connected"))
  .catch(err => console.log(err));
/* haroku = pro.env.port || local = 5000 */
const port = process.env.PORT || 5000;
/* express listening on port */
app.listen(port, () => console.log(`Server on port: ${port}`));

/* body parser middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport config
require("./config/passport")(passport);
//Passport middleware
app.use(passport.initialize());

/* route */
app.get("/", (req, res) => res.send("hello"));

/* use route */
app.use("/api/users", users);
app.use("/api/jobs", jobs);
