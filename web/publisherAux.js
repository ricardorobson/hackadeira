const mqtt = require('mqtt')
const clientMqtt = mqtt.connect('mqtt://broker.hivemq.com')

var interval = setInterval( function() {
	sendData()
},2000)

clientMqtt.on('message', () => {
	console.log('message')
})

function sendData()
{	
	clientMqtt.publish('hackadeira/sensors/temp',''+randomInt(100,200));
	clientMqtt.publish('hackadeira/sensors/hum',''+randomInt(100,200)+'~'+randomInt(100,200));
	clientMqtt.publish('hackadeira/sensors/light',''+randomInt(100,200));
}

function randomInt (low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}