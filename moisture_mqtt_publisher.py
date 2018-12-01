import paho.mqtt.publish as publish
import RPi.GPIO as GPIO
import time

#GPIO PORT
channel = 21

URL_BROKER = "broker.hivemq.com"

GPIO.setmode(GPIO.BCM)
GPIO.setup(channel,GPIO.IN)

def callback(channel):
	if GPIO.input(channel):
		publish.single("iot/moisture_status", "0", hostname=URL_BROKER)
		print("agua nao detectada")
	else:
		publish.single("iot/moisture_status", "1", hostname=URL_BROKER)
		print("agua detectada")

GPIO.add_event_detect(channel, GPIO.BOTH, bouncetime=300)
GPIO.add_event_callback(channel,callback)

while True:
	time.sleep(0.5)