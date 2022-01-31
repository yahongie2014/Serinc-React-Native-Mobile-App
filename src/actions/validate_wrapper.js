import validation from '../actions/validation.js';
export default function validate(fieldName, value, field) {
  var formValues = {};
  formValues[fieldName] = value;
  var formFields = {};
  formFields[fieldName] = validation[field];
  const result = validation(formValues, formFields);
  if (result) {
    // Return only the field error message if there are multiple
    return result[field][0];
  }

  return null;
}
