import RPi.GPIO as GPIO
from IMU import IMU
from Motor import Motor
from HCSR_04 import HCSR_04
import time

try:

    #motor = Motor()

    #motor.setupMotors()
    #motor.calibrate()
    #motor.flight()

    imu = IMU()
    hcsr04 = HCSR_04()
    motor = Motor()
    motor.setupMotors()
    motor.calibrate()

    while True:
        xRotation, yRotation = imu.readMPU6050Values()
        altitute = hcsr04.measureHCSR_04()
        command = 'move_up'
        throttleOffset, forwardRightOffset,forwardLeftOffset,backRightOffset,backLeftOffset = motor.flight(xRotation,yRotation,altitute,command)


except KeyboardInterrupt:
    print("Keyboard Interrupr")
finally:
    GPIO.cleanup()
    print("GPIOS are cleaned")
