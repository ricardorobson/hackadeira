var WebSocketServer = require('ws').Server;
wss = new WebSocketServer({port: 8080, path: '/'});
wss.on('connection', function(ws) {
	ws.on('message', function(message) {
		switch(message){
			case "openLight":
				console.log(message+" 1");
				break;
			case "closeLight":
				console.log(message+" 2")
				break;
			case "openWater":
				console.log(message+" 3")
				break;
			case "closeWater":
				console.log(message+" 4")
				break;
			default:
				console.log(message+" Default")
				break;
		}
	});
	console.log('new connection');
	ws.send('Msg from server');
});