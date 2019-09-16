/* routes api */
const users = require("../routes/api/users");
const jobs = require("../routes/api/jobs");
module.exports = function(app) {
  app.use("/api/users", users);
  app.use("/api/jobs", jobs);
};
