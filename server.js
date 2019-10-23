const express = require("express");
const app = express();

// Passport require users model
require("./routes/api/users");

// Middleware Configurations
require("./config/middlewares")(app);

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
