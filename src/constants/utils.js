export function isNonEmptyObject(variable) {
  // Check if the variable is an object
  if (typeof variable === 'object' && variable !== null) {
    // Check if the object has at least one key
    return Object.keys(variable).length > 0;
  }

  return false;
}
export function convertDateFormat(inputDate) {
  // Split the input date into day, month, and year
  var parts = inputDate.split("/");

  // Rearrange the parts to form the new date format (MM/DD/YYYY)
  var newDateFormat = parts[1] + "/" + parts[0] + "/" + parts[2];

  return newDateFormat;
}