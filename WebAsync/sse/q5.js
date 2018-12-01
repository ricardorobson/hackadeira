var http = require("http");
var port = 8686;

function randomInt (low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

http.createServer(function(req,res){
  console.log('New incoming client request for ' + req.url);
  res.writeHeader(200, {'Content-Type': 'application/json'}); //#A
  var key;
  var value;
  switch(req.url) { //#B
    case '/temperature':
      // And return the corresponding JSON
      key ="temperature";
      value=randomInt(1, 40);
      break;
    case '/light':
	  key ="light";
      value=randomInt(1, 100);
      break;
	case '/humidity':
	  key ="humidity";
      value=randomInt(1, 100);
	  break;
    default:
	  key ="hello";
      value="world";
  }
  
  if(req.headers['accept']=='text/event-stream'){
	  res.writeHeader(200, {"Content-Type":"text/event-stream"
						,"Cache-Control":"no-cache"
						,"Connection":"keep-alive"
						,"Access-Control-Allow-Origin": "*"});
		var interval = setInterval( function() {
		res.write("data: " + randomInt(100,127) + "\n\n");
		},2000);
  }else{
  
	  var header = req.headers['content-type'];
	  console.log(header);
	  
	  switch(header){
		case 'text/html':
		  res.writeHeader(200, {'Content-Type': 'application/json'}); //#C
		  res.write('<html><head></head><body><h1>'+key+'</h1><h2>'+value+'</h2></body></html>');
		  break;
		case 'application/xml':
		  res.writeHeader(200, {'Content-Type': 'application/xml'}); //#C
		  res.write('<'+key+'>\n\t'+value+'\n</'+key+'>');
		  break;
		case 'application/json':
		  res.writeHeader(200, {'Content-Type': 'application/json'}); //#C
		  res.write('{"'+key+'":'+value+'}');
		  break;
		case 'text/event-stream':
			
			break;
		default:
		  res.writeHeader(200, {'Content-Type': 'text/plain'}); //#C
		  res.write(key+' '+value);
	  }
  }
  //res.end();  //#D
}).listen(port);

console.log('Server listening on http://localhost:' + port);

//#A Setting the header to announce we return JSON representations
//#B Read the request URL and provide responses accordingly
//#C Write the temperature result as JSON
//#D Causes to return the results to the client