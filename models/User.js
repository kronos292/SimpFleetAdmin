const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* create a schema */
const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    default: ""
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  RegisterDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("users", UserSchema);
