import RPi.GPIO as GPIO
import threading

from MotorThread import MotorThread
import os
#from UAVCamera import startCamera

def startCamera():
    os.system("python3 UAVCamera.py")

try:

    #source ~/.profile
    #workon cv
    print("System initializing")
    cameraThread = threading.Thread(target = startCamera)
    cameraThread.start()

    motorThread = MotorThread()
    motorThread.motorThreadStarter()

except KeyboardInterrupt:
    print("Keyboard Interrup")
finally:
    GPIO.cleanup()
    print("GPIOS are cleaned")
