import sys
import RPi.GPIO as GPIO
from time import sleep

action = sys.argv[1]

pwm = None

def init_engine():
	global pwm

	GPIO.setmode(GPIO.BOARD)
	GPIO.setup(11,GPIO.OUT)
	pwm=GPIO.PWM(11,50)
	pwm.start(0)

def move_engine(angle):
	duty = angle / 18 + 2
	GPIO.output(11, True)
	pwm.ChangeDutyCycle(duty)
	sleep(1)
	GPIO.output(11, False)
	pwm.ChangeDutyCycle(0)

init_engine()

if action == 1: # open
	move_engine(140)
elif action == 0: # close
	move_engine(0)

if pwm:
	pwm.stop()
GPIO.cleanup()