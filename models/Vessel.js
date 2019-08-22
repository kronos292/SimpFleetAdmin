const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* create a schema */
const VesselSchema = new Schema({
  vessel_name: {
    type: String,
    required: true
  },
  vessel_imo: {
    type: String,
    required: true
  },
  vessel_callsign: {
    type: String,
    required: true
  }
});

module.exports = Vessel = mongoose.model("vessels", VesselSchema);
