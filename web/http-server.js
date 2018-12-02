var http = require('http')
var url = require('url')
var fs = require('fs')
var path = require('path')

var contentTypes = {
  'html' : 'text/html',
  'css'  : 'text/css',
  'jpg'  : 'image/jpg',
  'js'   : 'application/javascript'
}

http.createServer(function (req, res) {
  var urlPath = url.parse(req.url).pathname;
  
  if (urlPath==='/') {
    var filePath = path.join(__dirname, '', urlPath, 'index.html');
  } else {
    var filePath = path.join(__dirname, '', urlPath);
  }
  fs.readFile(filePath, function (fail, fileData) {
    if (fail) {
      res.writeHead(404);
      res.end();
    } else {
      var fileExt = path.extname(filePath).slice(1);
      res.setHeader('Content-Type', contentTypes[fileExt]);
      res.end(fileData);
    }
  });
}).listen(8686);