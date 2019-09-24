const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.contactNumber = !isEmpty(data.contactNumber) ? data.contactNumber : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.companyName = !isEmpty(data.companyName) ? data.companyName : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.contactNumber, { min: 4, max: 17 })) {
    errors.contactNumber = "Contact number must be between 4 and 17 numbers";
  }
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "First name is required";
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "Last name is required";
  }
  if (Validator.isEmpty(data.contactNumber)) {
    errors.contactNumber = "Contact number is required";
  }
  if (!Validator.isInt(data.contactNumber)) {
    errors.contactNumber = "fill in the fields with numbers";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.companyName)) {
    errors.companyName = "Company is required";
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
