const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* create a schema */
const VesselSchema = new Schema({});

module.exports = Vessel = mongoose.model("vessels", VesselSchema);
