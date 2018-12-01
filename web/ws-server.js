var WebSocketServer = require('ws').Server;
wss = new WebSocketServer({port: 8080, path: '/'});
wss.on('connection', function(ws) {
	ws.on('message', function(message) {
		switch(message){
			case "openLight":
				console.log(message);
				break;
			case "closeLight":
				console.log(message)
				break;
			case "openWater":
				console.log(message)
				break;
			case "closeWater":
				console.log(message)
				break;
			default:
				console.log("Option not found")
				break;
		}
	});
	console.log('new connection');
	ws.send('Msg from server');

	
	function refreshData()
	{
	    ws.send("light:1");  // 5 Seconds

	    // Do your thing here

	    setTimeout(refreshData, 1000);
	}


	refreshData(); // execute function
});