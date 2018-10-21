const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTranslationInput(data) {
  let errors = {};

  data.transportation = !isEmpty(data.transportation)
    ? data.transportation
    : '';

  if (Validator.isEmpty(data.transportation)) {
    errors.transportation = 'transportation field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
