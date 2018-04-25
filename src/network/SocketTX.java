package network;

import staticClasses.AttributeNames;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.OutputStream;
import java.net.Socket;

public class SocketTX {
    Socket socket = null;

    OutputStream outputStream = null;

    HttpServletRequest request = null;

    public SocketTX(){

    }

    public void setSocketTX(HttpServletRequest request){
        this.request = request;
        System.out.println("from socketTX host is: " + (String)request.getSession().getAttribute(AttributeNames.UAV_HOST_ADDRESS));
        System.out.println("from socket TX number is: " +(int)request.getSession().getAttribute(AttributeNames.UAV_HOST_TX_PORT_NUMBER) );
        try {
            socket = new Socket((String)request.getSession().getAttribute(AttributeNames.UAV_HOST_ADDRESS),
                    (int)request.getSession().getAttribute(AttributeNames.UAV_HOST_TX_PORT_NUMBER));
            outputStream = socket.getOutputStream();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void sendData(String message){
        byte buffer[] = message.getBytes();
        try {
            outputStream.write(buffer);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
