let handlers={};

handlers.normal = function(data,callback){
  console.log("inside normal handler");
  callback(201,{'essential-data':"norm"});
}

handlers.avocado = function(data,callback){
  console.log("wanna eat an avocado??");
  callback(202,{'essential-data':"avo"});
}
handlers.notFound = function(data,callback){
  console.log("inside notFound handler");
  callback(404,{'essential-data':"page does not exist"});
}
module.exports = handlers;
