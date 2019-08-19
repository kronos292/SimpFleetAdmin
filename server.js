const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
/* routes api */
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
/* DB config */
const db = require("./config/keys").mongoURI;

/* connect to mongoDB */
mongoose
  .connect(db)
  .then(() => console.log("Mongodb Connected"))
  .catch(err => console.log(err));

/* body parser middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* route */
app.get("/", (req, res) => res.send("hello"));
/* use route */
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

/* haroku = pro.en.port || local = 5000 */
const port = process.env.PORT || 5000;
/* express listening on port */
app.listen(port, () => console.log(`Server running on port ${port}`));
