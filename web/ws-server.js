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

/*

MQTT SERVER

*/
	const mqtt = require('mqtt')
	const clientMqtt = mqtt.connect('mqtt://broker.hivemq.com')

	clientMqtt.on('connect', () => {
		clientMqtt.subscribe('hackadeira/sensors/temp');
		clientMqtt.subscribe('hackadeira/sensors/humSoil');
		clientMqtt.subscribe('hackadeira/sensors/humEnv');
		clientMqtt.subscribe('hackadeira/sensors/light');
	})



	clientMqtt.on('message', (topic, message) => {
		switch(topic){
			case 'hackadeira/sensors/temp':
				ws.send("temp:"+message);
				break;
			case 'hackadeira/sensors/humSoil':
				ws.send("humSoil:"+message);
				break;
			case 'hackadeira/sensors/humEnv':
				ws.send("humEnv:"+message);
				break;
			case 'hackadeira/sensors/light':
				ws.send("light:"+message);
				break;
		}
	})


	clientMqtt.on('message', () => {
		console.log('message')
	})
});