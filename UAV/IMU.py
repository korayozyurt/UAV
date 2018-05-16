from time import sleep,time
import numpy
from imu.kalmanfilter import KalmanFilterLinear
from imu.lowpassfilter import lowpassfilter

from imu.MPU6050 import MPU6050

import math

"""
    This class measure the gyro and acce values to return throttle, yaw,pitch or roll
    to measure throttle, use both of gyro and hcsr_04 objects together.
    HCSR-04 runs when altitute is smaller than 400.

    the return types are:
    throttle: 'stable', ''
    yaw: 'stable', 'rotate left', 'rotate right'
    roll: 'stable', 'move right' , 'move left'
    pitch: 'stable', 'move forward' , 'move backward'
"""

class IMU:


    A = numpy.eye(3)
    H = numpy.eye(3)
    B = numpy.eye(3)*0
    Q = numpy.eye(3)*0.001

    R = numpy.eye(3)*0.01
    xhat = numpy.matrix([[0],[0],[0]])
    P= numpy.eye(3)

    kalmanFilter = KalmanFilterLinear(A,B,H,xhat,P,Q,R)
    lowPassFilter=lowpassfilter(0.025)

    fax=0
    fay=0
    faz=0
    fgx=0
    fgy=0
    fgz=0
    faxk=0
    fayk=0
    fazk=0
    faxf=0
    fayf=0
    fazf=0
    rg=0
    pg=0
    yg=0
    xRotation=0
    yRotation=0
    zRotation=0
    rc=0
    pc=0
    yc=0

    mpu6050 = None


    inittime=time()
    tottime=0
    cycletime=0.03

    def __init__(self):
        print("IMU is starting...")
        self.mpu6050=MPU6050()
        self.mpu6050.updateOffsets('IMU_offset.txt')
        self.mpu6050.readOffsets('IMU_offset.txt')
        print ('IMU ready!')

    def readMPU6050Values(self):
        self.tottime_old = self.tottime
        self.fax, self.fay, self.faz, self.fgx, self.fgy, self.fgz= self.mpu6050.readSensors()
        self.faxk, self.fayk, self.fazk = self.kalmanFilter.filter(numpy.matrix([[0],[0],[0]]),numpy.matrix([[self.fax],[self.fay],[self.faz]]))
        self.tottime = time() - self.inittime
        self.steptime = self.tottime - self.tottime_old
        self.faxf, self.fayf, self.fazf= self.lowPassFilter.filter(self.fax,self.fay,self.faz,self.steptime)

        #Calculate angles
        self.xRotation, self.yRotation, self.zRotation = self.getAngleAcc(self.fax, self.fay, self.faz)

        return int(self.xRotation),int(self.yRotation)

    def getAngleGyro(self,r,p,y,fgx,fgy,fgz,dt):
        new_r=r+fgx*dt
        new_p=p+fgy*dt
        new_y=y+fgz*dt
        return new_r,new_p,new_y


    def getAngleAcc(self,fax, fay, faz):
        #TODO it seems that right now the acc data are not correctly
        #scaled so that's why I'm using gravity=0.98
        g=0.980665
        pi=3.141592
        #ATTENTION atan2(y,x) while in excel is atan2(x,y)
        r=math.atan2(fay,faz+g)*180/pi
        p=math.atan2(fax,faz+g)*180/pi
        #ATTENTION the following calculation does not return
        #a consistent value.
        #by the way it is not used
        y=math.atan2(fax,fay)*180/pi

        return r,p,y


    def getAngleCompl(self,r,p,y,fay, faz, fgx, fgy, fgz,dt):
        tau=0.003
        #tau is the time constant in sec
        #for time periods <tau the  gyro takes precedence
        #for time periods > tau the acc takes precedence

        new_r,new_p,new_y=getAngleAcc(fax, fay, faz)
        a=tau/(tau+dt)
        new_r=a*(new_r+fgx*dt)+(1-a)*r
        new_p=a*(new_p+fgy*dt)+(1-a)*p
        #note the yaw angle can be calculated only using the
        # gyro that's why a=1
        a=1
        new_y=a*(new_y+fgz*dt)+(1-a)*y

        return new_r,new_p,new_y
