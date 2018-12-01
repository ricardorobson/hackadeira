import RPi.GPIO as GPIO
import time

channel = 21

GPIO.setmode(GPIO.BCM)
GPIO.setup(channel,GPIO.IN)

def callback(channel):
	if GPIO.input(channel):
		print("agua não detectada")
	else:
		print("agua detectada")

GPIO.add_event_detect(channel, GPIO.BOTH, bounctime=300)
GPIO.add_event_callback(channel,callback)

while True:
	time.sleep(1)