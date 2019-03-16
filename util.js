var util = {};

util.assignIfNotEmpty = function(data, dataType, defaultValue){
  if(typeof(data)==dataType && data!= null)
  return data;
  else
  return defaultValue
}
module.exports = util;
