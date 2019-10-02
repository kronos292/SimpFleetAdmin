const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
// Passport require users model
require("./routes/api/users");

/* body parser middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport config
require("./config/passport")(passport);
//Passport middleware
app.use(passport.initialize());

// Express route handlers
require("./startup/routes")(app);
// MongoDB Connection
require("./startup/db")();
/* haroku = pro.env.port || local = 5000 */
const port = process.env.PORT || 5000;
/* express listening on port */
app.listen(port, () =>
  console.log(`System start running on port: ${port}, Happy hacking.`)
);
