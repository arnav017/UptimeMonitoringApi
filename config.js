let util = require('./util');

var environment = {}

environment.staging = {
  port:"3001",
  name:"staging"
}

environment.production = {
  port:"3003",
  name:"production"
}

let node_env = typeof(process.env.NODE_ENV)=='string' ? process.env.NODE_ENV.toLowerCase() : '' ;

let exportedEnvironment = typeof(environment[node_env]) != 'undefined' ? environment[node_env] : environment.staging;

module.exports = exportedEnvironment;
