const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");

/* routes api */
const users = require("./routes/api/users");
const jobs = require("./routes/api/jobRoutes");
/* body parser middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport config
require("./config/passport")(passport);
//Passport middleware
app.use(passport.initialize());

/* use route */
app.use("/api/users", users);
app.use("/api/jobs", jobs);

// MongoDB Connection
require("./startup/db")();
/* haroku = pro.env.port || local = 5000 */
const port = process.env.PORT || 5000;
/* express listening on port */
app.listen(port, () =>
  console.log(`System start running on port: ${port}, Happy hacking.`)
);
