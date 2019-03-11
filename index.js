//nodejs-core-dependencies
let http = require('http');
let url = require('url');
let StringDecoder = require('string_decoder').StringDecoder;

////my-file-dependencies
let handlers = require('./handlers');

let routers = {
  normal:handlers.normal,
  avocado:handlers.avocado
};


//starting server
let server = http.createServer(function(req, res) {
  console.log("started");

  // ---- Part-1 parsing all the table ----

  //we are sending second parameter as true to make use of queryString module
  //which will be called by url module internally. Its as good as us calling
  //the queryString externally.
  let parsedUrl = url.parse(req.url, true);
  let path = parsedUrl.pathname;
  let query = parsedUrl.query;
  let search = parsedUrl.search;

  //remove excess slashes from the beginning
  let trimmedPath = path.replace(/^\/+|\/+$/g, '');

  let method = req.method.toLowerCase();
  let headers = req.headers;
  let payload = req.payload;

  //payload comes to the server as a stream
  //this happens on the event 'data'
  let stringDecoder = new StringDecoder('utf-8');
  let buffer = '';
  let selectedHandler;

  if (typeof(routers[trimmedPath]) != 'undefined') {
    selectedHandler = routers[trimmedPath];
  }
  else{
    selectedHandler = handlers.notFound;
  }

  selectedHandler(payload,function(statusCode,recievedData){
    console.log("definig callback");
        res.writeHead(statusCode);
        res.end(JSON.stringify(recievedData));
      });

  req.on('data', function(recievedData) {
    buffer += stringDecoder.write(recievedData);
  });


  //we need to bind to the end event which tells us when the stream has ended
  //this is how we collect strings which come in forms of streams
  req.on('end', function(recievedData) {
    //i am not really sure what this does so commenting it for now
  //  buffer += stringDecoder.end();

  //  console.log("payload is :-\n"+buffer);

    //remove this writeHead when i start sending callbacks
  //  res.writeHead(777);
    //res.end("request ended");

  });
});

server.listen(3000, function() {
  console.log("listening on 3000");
});
console.log("Hello world");
