var motorStatus = 0;
var manualMode = false;

var WebSocketServer = require('ws').Server;
wss = new WebSocketServer({port: 8080, path: '/'});
wss.on('connection', function(ws) {
	ws.on('message', function(message) {
		switch(message){
			case "openMotor":
				if(manualMode){
					execute('python ../motor.py 1');
				}
				break;
			case "closeMotor":
				if(manualMode){
					execute('python ../motor.py 0');
				}
				break;
			case "getMode":
				ws.send('mode:'+manualMode);
				break;
			case "alterMode":
				manualMode=!manualMode;
				if(manualMode){
					ws.send('mode:true');
				}else{
					ws.send('mode:false');
				}
				break;
			default:
				console.log("Option not found")
				break;
		}
		
	});
	ws.send('Msg from server');


	function execute(command) {
	  const exec = require('child_process').exec

	  exec(command, (err, stdout, stderr) => {
	    process.stdout.write(stdout)
	  })
	}

	

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
		console.log(topic+'\t'+message)
		switch(topic){
			case 'hackadeira/sensors/temp':
				ws.send("temp:"+message);
				break;
			case 'hackadeira/sensors/humSoil':
				if(message != motorStatus+'' && !manualMode){
					if(message=='0'){
						execute('python ../motor.py 1')
					}else{
						execute('python ../motor.py 0')
					}
				}
				ws.send("humSoil:"+message);
				break;
			case 'hackadeira/sensors/humEnv':
				ws.send("humEnv:"+message);
				break;
			case 'hackadeira/sensors/light':
				if(message != motorStatus+'' && !manualMode){
					if(parseInt(message)<10000){
						execute('python ../motor.py 1')
					}else{
						execute('python ../motor.py 0')
					}
				}
				ws.send("light:"+message);
				break;
		}
	})
});