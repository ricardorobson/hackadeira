const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')

var sensorLib = require('node-dht-sensor');
//22 é o tipo do sensor e 12 é o pino GPIO
sensorLib.initialize(22, 12);

var interval = setInterval(function () {
    read();
}, 2000);

client.on('message', () => {
    console.log('message')
})

function read() {
	console.log('publishing')
    var readout = sensorLib.read();
    console.log(readout.temperature.toFixed(2));
    client.publish('hackadeira/sensors/temp', readout.temperature.toFixed(2));
    client.publish('hackadeira/sensors/humEnv', readout.humidity.toFixed(2));
};