import socket
import pickle

class UAVServerTX():
    host = ""
    port = 5000

    uavSocket = None

    connection = None
    address = None

    def __init__(self):
        self.serverSetup()

    def serverSetup(self):
        print("Server TX is building...")
        self.uavSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.uavSocket.bind((self.host, self.port))

        self.uavSocket.listen(5)
        self.connection, self.address = self.uavSocket.accept()
        print("Connection from " + str(self.address))

    def sendData(self,data):
        print("sending: " + str(data))
        self.connection.send(pickle.dumps(data))
    def closeConnection(self):
        self.connection.close()
