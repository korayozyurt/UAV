import time
import os
import pigpio
import RPi.GPIO as GPIO

import math
"""
    date time is used to calculate integral i in pid control
"""




class Motor():


    lipoRelayControl = 20

    forwardRight = 23  # ESC pin
    forwardLeft = 18
    backLeft = 21
    backRight = 25

    forwardRightOffset = 0
    forwardLeftOffset = 0
    backLeftOffset = 0
    backRightOffset = 0

    #to control esc with pi library
    pi = None

    maxThrottle = 2000
    minThrottle = 700
    minSpeed = 790

    """
         the control offset will be found by reinforcement learning algorithm
         the offsets will control the drone

          throttleOffset keeps the drone at stable altitute
          movementThrottle make a maneuver
     """
    throttleOffset = 0
    throttleOffset += minSpeed


    """
        I set the movement off set three for now
    """
    movementOffset = 3


    throttle = None
    yaw = None
    pitch = None
    roll = None

    xRotation = None
    yRotation = None
    previousXError = 0    #to use pid control, it will be used for integral
    previousYError = 0    #to use pid control
    previousThrottleError = 0

    throttleDistance = 10   #if HCSR-04 is accessable



    """
        the alpha value is the alpha which is that
        used in artificial intelligence
    """
    alpha = 8

    rotationPidP = 1.6
    rotationPidi = 0.01
    rotationPidd = 0.00

    """
        These are  the reference values will be used to centralize MPU6050
    """

    def __init__(self):
        print("Motor object is created")
        GPIO.setmode(GPIO.BCM)

    def setupMotors(self):
        os.system("sudo pigpiod")  # to launch pigpiod library
        time.sleep(1)

        GPIO.setup(self.lipoRelayControl, GPIO.OUT)
        self.pi = pigpio.pi()

    #first moveUp set the movementOffset try 5 times move up by using distance
    def firstMoveUp(self):
        counter = 0
        while(counter < 0):
                self.flight('move up')
                if(self.throttle == 'move up'):
                    counter += 1

                    self.throttleOffset += self.alpha

    def flight(self,x,y,altitute,command):
        """
                        status would be like this:
                        throttle : stable, ascending, descending
                        yaw : stable, rotate left, rotate right
                        pitch : stable, move forward, move backward
                        roll: stable, move left, move right
        """

        self.xRotation = x
        self.yRotation = y
        self.altitute = altitute

        #self.throttleControl(command)
        """self.yawControl(command)
        self.pitchControl(command)
        self.rollControl(command)
        self.stableDrone()"""

        if(command == "run_motors"):
            self.resetMovementOffsets()
            self.throttleOffset = 0

        if(command == "move_up"):
            self.xPidControl()
            self.yPidControl()
            self.throttlePidControl()


        print("x rotation is: ", self.xRotation)
        print("y rotation is: ", self.yRotation)

        self.runMotors()

        return self.throttleOffset, self.forwardRightOffset,self.forwardLeftOffset, self.backRightOffset,self.backLeftOffset



    def xPidControl(self):
        pidLimit = 150
        """
            expected is 0
        """
        self.resetMovementOffsets()
        error = self.xRotation
        pid = (error * self.rotationPidP) + ((self.previousYError + error) * self.rotationPidi) + (self.previousXError * self.rotationPidd)
        print("x rotation is: ",self.xRotation ,"x pid error is: " , pid)
        if(pid > pidLimit):
            #self.resetMovementOffsets()
            pid = pidLimit
        if(pid > 0):
            self.backRightOffset += pid        #backright stted two times
            self.backLeftOffset += pid
            #self.forwardRightOffset -= pid
            #self.forwardLeftOffset -= pid
        elif(pid < 0):
            pid = -1 * pid
            self.forwardRightOffset += pid
            self.forwardLeftOffset += pid
            #self.backRightOffset -= pid        #backright stted two times
            #self.backLeftOffset -= pid

        self.previousXError = error

    def yPidControl(self):
        pidLimit = 150
        """
            expected is 0
        """
        #self.resetMovementOffsets()
        error = self.yRotation
        self.previousYError += error
        pid = (error * self.rotationPidP) + ((self.previousYError + error) * self.rotationPidi) + (self.previousXError * self.rotationPidd)
        print("y rotation is: ",self.yRotation,"y pid error is: ", pid)
        if(pid > pidLimit):
            pid = pidLimit
            #self.resetMovementOffsets()
        if(pid < 0 ):
            pid = -1 * pid
            self.forwardLeftOffset += pid
            self.backLeftOffset += pid
            #self.forwardRightOffset -= pid
            #self.backRightOffset -= pid
        elif(pid > 0):
            self.forwardRightOffset += pid
            self.backRightOffset += pid
            #self.forwardLeftOffset -= pid
            #self.backLeftOffset -= pid

        self.printOffsets()
        self.previousYError = error

    def throttlePidControl(self):
        pidLimit = 100
        p = 0.9
        i = 0.02
        d = 0.01

        if(self.throttleDistance == -1):
            self.throttleDistance = 10
        print("throttle is: ", self.throttleDistance)
        """
        For now 15 is my expected!!!
        """
        expectedDistance = 16
        error = self.throttleDistance - expectedDistance
        pid = (error * p ) + (error * i ) + (self.previousThrottleError * d)
        print("throttle pid error is: " , pid)
        if(pid > pidLimit ):
            pid = pidLimit

        self.throttleOffset -= pid
        self.previousThrottleError = pid



    def printOffsets(self):
        print("forward right offset is: ", self.forwardRightOffset)
        print("forward left offset is: ", self.forwardLeftOffset)
        print("back right offset is: ", self.backRightOffset)
        print("back left offset is: ", self.backLeftOffset)

    def resetMovementOffsets(self):
        self.forwardRightOffset = 0
        self.forwardLeftOffset = 0
        self.backRightOffset = 0
        self.backLeftOffset = 0

    """
        throttle control move up or down the uav by the command

        expected commands : 'move up' or 'move down'
    """

    def yawControl(self, command):
        if (command == 'rotate left'):
            self.forwardRightOffset += self.movementOffset
            self.backLeftOffset += self.movementOffset
        elif (command == 'rotate right'):
            self.forwardLeftOffset += self.movementOffset
            self.backRightOffset += self.movementOffset

    """
        Roll control move left or right

        expected commands : 'move left' or 'move right'
    """

    def rollControl(self, command):
        if (command == 'move left'):
            self.forwardRightOffset += self.movementOffset
            self.backRightOffset += self.movementOffset
        elif (command == 'move right'):
            self.forwardLeftOffset += self.movementOffset
            self.backLeftOffset += self.movementOffset

    """
        pitch control move forward or move backward

        expected commands : 'move forward' or 'move backward'
    """
    def pitchControl(self,command):
        if(command == 'move forward'):
            self.backRightOffset += self.movementOffset
            self.backLeftOffset += self.movementOffset
        elif(command == 'move backward'):
            self.forwardRightOffset += self.movementOffset
            self.forwardLeftOffset += self.movementOffset


    """
        throttle offset is minSpeed + altituteSpeed
        and motors can be controlled by offsets
    """
    def runMotors(self):
        if(self.throttleOffset + self.forwardRightOffset < self.minSpeed):
            self.pi.set_servo_pulsewidth(self.forwardRight, self.minSpeed)
        elif(self.throttleOffset + self.forwardRightOffset > 2500):
            self.pi.set_servo_pulsewidth(self.forwardRight, 1900)
        else:
            self.pi.set_servo_pulsewidth(self.forwardRight, self.throttleOffset + self.forwardRightOffset)

        if(self.throttleOffset + self.backLeftOffset < self.minSpeed):
            self.pi.set_servo_pulsewidth(self.backLeft, self.minSpeed)
        elif(self.throttleOffset + self.backLeftOffset > 2500):
            self.pi.set_servo_pulsewidth(self.backLeft, 1900)
        else:
            self.pi.set_servo_pulsewidth(self.backLeft, self.throttleOffset + self.backLeftOffset)


        if(self.throttleOffset + self.forwardLeftOffset < self.minSpeed):
            self.pi.set_servo_pulsewidth(self.forwardLeft, self.minSpeed)
        elif(self.throttleOffset + self.forwardLeftOffset > 2500):
            self.pi.set_servo_pulsewidth(self.forwardLeft, 1900)
        else:
            self.pi.set_servo_pulsewidth(self.forwardLeft, self.throttleOffset + self.forwardLeftOffset)


        if(self.throttleOffset + self.backRightOffset < self.minSpeed):
            self.pi.set_servo_pulsewidth(self.backRight, self.minSpeed)
        elif(self.throttleOffset + self.backRightOffset > 2500):
            self.pi.set_servo_pulsewidth(self.backRight, 1900)
        else:
            self.pi.set_servo_pulsewidth(self.backRight, self.throttleOffset + self.backRightOffset)



    def calibrate(self):
        self.pi.set_servo_pulsewidth(self.forwardRight, 0)
        self.pi.set_servo_pulsewidth(self.forwardLeft, 0)
        self.pi.set_servo_pulsewidth(self.backLeft, 0)
        self.pi.set_servo_pulsewidth(self.backRight, 0)
        print("disconnecting the battery")
        GPIO.output(self.lipoRelayControl, GPIO.HIGH)
        time.sleep(1)
        self.pi.set_servo_pulsewidth(self.forwardRight, self.maxThrottle)
        print("ccnnecting the battery")
        GPIO.output(self.lipoRelayControl, GPIO.LOW)
        time.sleep(2)
        self.pi.set_servo_pulsewidth(self.forwardRight, self.minThrottle)
        self.pi.set_servo_pulsewidth(self.forwardLeft, self.minThrottle)
        self.pi.set_servo_pulsewidth(self.backLeft, self.minThrottle)
        self.pi.set_servo_pulsewidth(self.backRight, self.minThrottle)
        time.sleep(2)
        self.pi.set_servo_pulsewidth(self.forwardRight, 0)
        self.pi.set_servo_pulsewidth(self.forwardLeft, 0)
        self.pi.set_servo_pulsewidth(self.backLeft, 0)
        self.pi.set_servo_pulsewidth(self.backRight, 0)
        print("Arming ESC now")
        time.sleep(2)
        self.pi.set_servo_pulsewidth(self.forwardRight, self.minThrottle)
        self.pi.set_servo_pulsewidth(self.forwardLeft, self.minThrottle)
        self.pi.set_servo_pulsewidth(self.backLeft, self.minThrottle)
        self.pi.set_servo_pulsewidth(self.backRight, self.minThrottle)
        time.sleep(1)
        time.sleep(1)
        print("motors are calibrated")
