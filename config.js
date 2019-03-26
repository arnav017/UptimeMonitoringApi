let util = require('./util');

var environment = {}

environment.staging = {
  httpPort:"3001",
  httpsPort:"3002",
  name:"staging"
}

environment.production = {
  httpPort:"3003",
  httpsPort:"3004",
  name:"production"
}

let node_env = typeof(process.env.NODE_ENV)=='string' ? process.env.NODE_ENV.toLowerCase() : '' ;
let exportedEnvironment = typeof(environment[node_env]) != 'undefined' ? environment[node_env] : environment.staging;

//let node_env = util.assignIfNotEmpty(process.env.NODE_ENV,'string','',true);
//let exportedEnvironment = util.assignIfNotEmpty(environment[node_env],'object',environment.staging,false);
module.exports = exportedEnvironment;
