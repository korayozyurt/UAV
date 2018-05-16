import RPi.GPIO as GPIO
import time

class HCSR_04():

    ECHO = 19
    TRIG = 26

    def __init__(self):
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(self.TRIG,GPIO.OUT)
        GPIO.setup(self.ECHO,GPIO.IN)

    def measureHCSR_04(self):
        GPIO.output(self.TRIG, False)
        #time.sleep(0.1)

        GPIO.output(self.TRIG, True)
        time.sleep(0.00001)
        GPIO.output(self.TRIG, False)

        while GPIO.input(self.ECHO)==0:
            pulse_start = time.time()

        while GPIO.input(self.ECHO)==1:
            pulse_end = time.time()

        pulse_duration = pulse_end - pulse_start

        distance = pulse_duration * 17150
        distance = round(distance, 2)
        distance = distance - 0.5

        if distance > 2 and distance < 400:
            return distance
        else:
            return -1
