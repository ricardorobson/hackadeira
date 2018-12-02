from time import sleep
import paho.mqtt.publish as publish
import serial
URL_BROKER = "broker.hivemq.com"
ser = serial.Serial('/dev/ttyACM0', 9600) 
while True:
    
     saida = ser.readline()
     if(b'U' in saida):
          x = saida.find(b'U')
          saida_mqtt = saida[x+1:x+3].decode("utf-8")
          print(saida_mqtt)
          publish.single("hackadeira/sensors/humEnv", saida_mqtt, hostname=URL_BROKER)
     if(b'T' in saida):
          x = saida.find(b'T')
          saida_mqtt = saida[x+1:x+3].decode("utf-8")
          print(saida_mqtt)
          publish.single("hackadeira/sensors/tem", saida_mqtt, hostname=URL_BROKER)  
     
     sleep(0.5)
