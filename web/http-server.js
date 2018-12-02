var http = require('http'),
    fs = require('fs');



var server = http.createServer(function (request, response) {
    console.log(request.url);
    response.write(fs.readFile('./'+request.url);
    response.end();
}).listen(8686);