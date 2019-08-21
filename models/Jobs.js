const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* create a schema */
const JobSchema = new Schema({});

module.exports = Job = mongoose.model("jobs", JobSchema);
