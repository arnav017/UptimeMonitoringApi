//nodejs-core-dependencies
let http = require('http');
let https = require('https');
let url = require('url');
let fs = require('fs');
let StringDecoder = require('string_decoder').StringDecoder;

//my-file-dependencies
let _handlers = require('./handlers');
let env = require('./config');
let _file = require('./lib/file');

let routers = {
  normal: _handlers.normal,
  avocado: _handlers.avocado
};

let httpsServerOptions = {
  key:fs.readFileSync('./https/key.pem'),
  cert:fs.readFileSync('./https/certificate.pem')
}

//starting server
let httpServer = http.createServer(function(req, res) {
  console.log("http server created");
  serverFunctions(req, res);
});
let httpsServer = https.createServer(httpsServerOptions,function(req, res) {
  console.log("https server created");
  serverFunctions(req, res);
});
httpServer.listen(env.httpPort,function() {
  console.log("http listening at "+env.httpPort+" on "+env.name);
});
httpsServer.listen(env.httpsPort,function() {
  console.log("https listening at "+env.httpsPort+" on "+env.name);
});

console.log("Hello Wrold");

function serverFunctions(req, res){
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
  } else {
    selectedHandler = handlers.notFound;
  }



  req.on('data', function(recievedData) {
    buffer += stringDecoder.write(recievedData);
  });

  //we need to bind to the end event which tells us when the stream has ended
  //this is how we collect strings which come in forms of streams
  req.on('end', function(recievedData) {
    //i am not really sure what this does so commenting it for now
    //  buffer += stringDecoder.end();
    selectedHandler(payload, function(statusCode, recievedData) {
      res.setHeader('content-type', 'json')
      res.writeHead(statusCode);
      res.end(JSON.stringify(recievedData));
    });
    //remove this writeHead when i start sending callbacks
    //  res.writeHead(777);
    //res.end("request ended");
  });
}
