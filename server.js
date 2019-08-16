const express = require("express");
const mongoose = require("mongoose");

const app = express();

//Database Connection
const db = require("./config/dbconfig").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB localhost"))
  .catch(err => console.log(err));

//Port Setting
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
