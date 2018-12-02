import Adafruit_ADS1x15
from time import sleep, strftime, time
import numpy

adc = Adafruit_ADS1x15.ADS1115()
GAIN = 1

def ldr():
    ldrValue = adc.read_adc(0, gain=GAIN)
    return ldrValue

while True:
	try:
		per = numpy.interp(ldr(), [0, 32676], [0, 100])
		print('LDR raw value: ' + str(ldr()))
		sleep(2)	
	except KeyboardInterrupt:
		GPIO.cleanup()
		sleep(1)