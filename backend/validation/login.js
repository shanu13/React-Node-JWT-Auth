const Validator = require("validator");
const isEmpty = require("is-empty");


function validateLoginInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.rollNo = !isEmpty(data.rollNo) ? data.rollNo : "";

  // Email checks
  // if (Validator.isEmpty(data.email)) {
  //   errors.email = "Email field is required";
  // } else if (!Validator.isEmail(data.email)) {
  //   errors.email = "Email is invalid";
  // }

  // rolNo checks
  if (Validator.isEmpty(data.rollNo)) {
    errors.password = "roll Number field is required";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports =  validateLoginInput