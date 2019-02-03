//dependencies
let http = require('http');
let url = require('url');
let StringDecoder = require('string_decoder').StringDecoder;


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
  let payload = req.payload;

  //payload comes to the server as a stream
  //this happens on the event 'data'

  let stringDecoder = new StringDecoder('utf-8');
  let buffer=''

  req.on('data',function(recievedData){
    buffer += stringDecoder.write(recievedData);
  });
  req.on('end',function(recievedData){

    //i am not really sure what this does so commenting it for now
    //buffer += stringDecoder.end();
    console.log(buffer);
    res.end("request ended");
  });

});
server.listen(3000,function(){
  console.log("listening on 3000");
});
console.log("Hello world");
