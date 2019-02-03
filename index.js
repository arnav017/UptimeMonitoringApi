let http = require('http');
let url = require('url');

let server = http.createServer(function(req,res){

  //we are sending second parameter as true to make use of queryString module
  //which will be called by url module internally. Its as good as us calling
  //the queryString externally.

  let parsedUrl = url.parse(req.url,true);
  let path = parsedUrl.pathname;
  let query = parsedUrl.query;
  let search = parsedUrl.search;

  //remove excess slashes from the beginning
  let trimmedPath = path.replace(/^\/+|\/+$/g,'');

  let method = req.method.toLowerCase();
  let headers = req.headers;
  console.log(trimmedPath);
  //console.log(headers);

  res.end("request ended");

});
server.listen(3000,function(){
  console.log("listening on 3000");
});
console.log("Hello world");
