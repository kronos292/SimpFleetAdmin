const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
  data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
  data.contact = !isEmpty(data.contact) ? data.contact : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.contact, { min: 4, max: 17 })) {
    errors.contact = "Contact number must be between 4 and 17 numbers";
  }
  if (Validator.isEmpty(data.first_name)) {
    errors.first_name = "First name is required";
  }
  if (Validator.isEmpty(data.last_name)) {
    errors.last_name = "Last name is required";
  }
  if (Validator.isEmpty(data.contact)) {
    errors.contact = "Contact number is required";
  }
  if (!Validator.isInt(data.contact)) {
    errors.contact = "fill in the fields with numbers";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.company)) {
    errors.company = "Company is required";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (!Validator.isLength(data.password, { min: 5, max: 30 })) {
    errors.password = "Password must be at least between 6 and 30 characters";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password is required";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords did not matched";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
