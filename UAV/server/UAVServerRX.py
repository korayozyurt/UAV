import socket
import json

class UAVServerRX():
    host = ""
    port = 5001

    uavSocket = None

    connection = None
    address = None

    def __init__(self):
        print("UAVServerRx is building...")
        self.serverSetup()

    def serverSetup(self):
        print("Server RX is building...")
        self.uavSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.uavSocket.bind((self.host, self.port))

        self.uavSocket.listen(5)
        self.connection , self.address = self.uavSocket.accept()
        print("connection from " + str(self.address))

    def getData(self):
        #self.serverSetup()
        print("Data is receiving.../.../.../.../")
        data = self.connection.recv(20)
        data = data.decode('utf-8')
        #self.uavSocket.close()
        if(data != ""):
            return data
        #return data
