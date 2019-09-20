const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* create a schema */
const VesselSchema = new Schema({
  psaVessels: [{ type: Schema.Types.ObjectId, ref: "psaVessels" }],
  mpaVessel: { type: Schema.Types.ObjectId, ref: "mpaVessels" },
  marineTrafficVessel: {
    type: Schema.Types.ObjectId,
    ref: "marineTrafficVessels"
  },
  vesselIMOID: { type: String, default: "" },
  vesselName: { type: String, default: "" },
  vesselCallsign: { type: String, default: "" }
});

module.exports = Vessel = mongoose.model("vessels", VesselSchema);
