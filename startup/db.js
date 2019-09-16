const mongoose = require("mongoose");

/* DB config */
const db = require("../config/keys").mongoURI;
module.exports = function() {
  /* connect to mongoDB */
  mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Database Connected"))
    .catch(err => console.log(err));
};

module.exports.mongoose = mongoose;
