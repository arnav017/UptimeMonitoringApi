let http = require('http');

let server = http.createServer(function(req,res){
  console.log("server started");
});
server.listen(3000,function(){
  console.log("listening on 3000");
});
console.log("Hello world");
