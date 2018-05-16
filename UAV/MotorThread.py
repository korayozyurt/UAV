from IMU import IMU
from HCSR_04 import HCSR_04
from Motor import Motor
from server.UAVServerRX import UAVServerRX
from server.UAVServerTX import UAVServerTX
import threading
import json
import time


class MotorThread():

    xRotation = 0
    yRotation = 0
    altitute = 0

    #send the offset values to telemetry screen using TXServer
    #sequence is as we see
    throttleOffset = 0
    forwardRightOffset = 0
    forwardLeftOffset = 0
    backRightOffset = 0
    backLeftOffset = 0

    gps_x = 37.052666
    gps_y = 30.622527

    temp = 56.3

    motor = None
    imu = None
    hcsr04 = None

    motorThread = None
    sensorHandlerThread = None
    commanderThread = None

    uavServerTX = None
    uavServerRX = None

    motorThreadControl = 0

    """
        motor handler thread listening the command
        if command == run_motors   then motors will run with minimum speed
    """
    command = None

    def __init__(self):
        print("Motor thread is created")

        self.uavServerTX = UAVServerTX()
        self.uavServerRX = UAVServerRX()

        self.imu = IMU()


    def motorThreadStarter(self):

        self.sensorHandlerThread = threading.Thread(target = self.sensorHandler)
        self.sensorHandlerThread.start()

        self.commanderThread = threading.Thread(target = self.commander)
        self.commanderThread.start()


    def motorHandler(self):
        print("Motor thread is started!")
        self.hcsr04 = HCSR_04()
        while self.motorThreadControl == 1:
            self.xRotation , self.yRotation = self.imu.readMPU6050Values()
            try:
                self.altitute = self.hcsr04.measureHCSR_04()
            except:
                self.altitute = -1
            try:
                self.throttleOffset, self.forwardRightOffset,self.forwardLeftOffset,self.backRightOffset,self.backLeftOffset = self.motor.flight(self.xRotation,self.yRotation,self.altitute,self.command)
            except:
                print("Motor thread has an exception")
        print("Motor thread is finished!")


    """
        sensor handler collect the sensor data
        and sent datas at client using servetTX
        delay is 1 seconds
    """
    def sensorHandler(self):
        print("Sensor Handler is started!")
        delay = 0.3
        while True:
            sensorValues = {}
            sensorValues["xRotation"] = self.xRotation
            sensorValues["yRotation"] = self.yRotation
            sensorValues["altitute"] = self.altitute
            sensorValues["throttleOffset"] = self.throttleOffset
            sensorValues["forwardRightOffset"] = self.forwardRightOffset
            sensorValues["forwardLeftOffset"] = self.forwardLeftOffset
            sensorValues["backRightOffset"] = self.backRightOffset
            sensorValues["backLeftOffset"] = self.backLeftOffset
            sensorValues["gps_x"] = self.gps_x
            sensorValues["gps_y"] = self.gps_y
            sensorValues["temp"] = self.temp

            sensorValuesJsonString = json.dumps(sensorValues)
            try:
                self.uavServerTX.sendData(sensorValuesJsonString)
            except:
                print("Server TX is dropped!")
                break

            time.sleep(delay)
        print("Sensor handler thread is finished!")

    def checkCommander(self):
        if(self.command == 'run_motor'):
            self.motor = Motor()
            self.motor.setupMotors()
            self.motor.calibrate()
            self.motorThreadControl = 1
            self.motorThread = threading.Thread(target = self.motorHandler)
            self.motorThread.start()
        elif(self.command == 'stop_motor'):
            self.motorThreadControl = 0
        self.data = ""




    def commander(self):
        print("Commander thread is started!")
        while True:
            try:
                data = self.uavServerRX.getData()
                print("commander data is: ", data)
                self.command = data
            except:
                print("Server RX is dropped")
                break
            self.checkCommander()
        print("Commander thread is finished!")
