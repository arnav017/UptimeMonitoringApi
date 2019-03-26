var util = {};

util.assignIfNotEmpty = function(data, dataType, defaultValue,converToLowerCase){
  if((data)==dataType && data!= null)
  return converToLowerCase ? data.toLowerCase() : data;
  else
  return defaultValue
}
module.exports = util;
