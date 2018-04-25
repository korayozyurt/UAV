package network;

import staticClasses.AttributeNames;
import tools.Log;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.InputStream;
import java.net.Socket;

public class SocketRX {
    Socket socket = null;

    InputStream inputStream = null;

    HttpServletRequest request = null;

    int character;

    public SocketRX() {

    }

    public void setSocketRX(HttpServletRequest request){
        this.request = request;
        System.out.println("host is: " + (String)request.getSession().getAttribute(AttributeNames.UAV_HOST_ADDRESS));
        System.out.println("number is: " +(int)request.getSession().getAttribute(AttributeNames.UAV_HOST_RX_PORT_NUMBER) );
        try {
            socket = new Socket((String)request.getSession().getAttribute(AttributeNames.UAV_HOST_ADDRESS),
                    (int)request.getSession().getAttribute(AttributeNames.UAV_HOST_RX_PORT_NUMBER));
            inputStream = socket.getInputStream();
        } catch (IOException e) {
            e.printStackTrace();
            Log.insertLog(request,getClass().toString() + " SocketRX create ERROR");
        }

    }

    public String getData(){
        String message = "";
        while(character != -1){
            try{
                character = inputStream.read();
            }catch (IOException e){
                System.out.println("SocketRX is dropped while reading something");
                return null;
            }catch(Exception e){
                System.out.println(getClass().getName().toString() + "has unknown error");
                e.printStackTrace();
                return null;
            }catch(Throwable e){
                System.out.println(getClass().getName().toString() + "SocketRX is dropped while reading something");
                return null;
            }
            message += (char)character;
            if(character == '}'){       //SPLIT JSON
                message = message.substring(message.indexOf('{'),message.length());
                //Log.insertLog(request,message);               //close for NOW!!
                return message;
            }
        }
        return null;
    }
}
