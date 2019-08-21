const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* create jobs schema */
const JobSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  job_number: {
    type: String
  },
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
  },
  lighter_name: {
    type: String
  },
  lighter_location: {
    type: String
  },
  lighter_remarks: {
    type: String
  },
  addres_vessel_loading: {
    type: String
  },
  berthing_time: {
    type: Date
  },
  unberthing_time: {
    type: Date
  },
  items_delivery: {
    type: String,
    required: true
  },
  items_offland: {
    type: String,
    required: true
  },
  remarks: {
    type: String
  },
  permit_request: {
    type: Boolean,
    default: false
  },
  status: [
    {
      status_1: {
        type: Boolean,
        default: false
      },
      status_2: {
        type: Boolean,
        default: false
      },
      status_3: {
        type: Boolean,
        default: false
      },
      status_4: {
        type: Boolean,
        default: false
      },
      status_5: {
        type: Boolean,
        default: false
      },
      status_6: {
        type: Boolean,
        default: false
      }
    }
  ]
});

module.exports = Job = mongoose.model("jobs", JobSchema);
