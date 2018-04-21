package thread;


import network.SocketRX;
import network.UAVWebSocketHandler;
import tools.WebSocketSession;

import javax.servlet.http.HttpServletRequest;
import javax.websocket.Session;

public class SocketRXThread extends Thread {

    private SocketRX socketRX = null;
    private HttpServletRequest request = null;
    private UAVWebSocketHandler uavWebSocketHandler = null;

    public SocketRXThread(String name) {
        super(name);
        uavWebSocketHandler = new UAVWebSocketHandler();
    }

    public void setSocketRXThread(HttpServletRequest request){
        this.request = request;
        this.socketRX = new SocketRX();
        this.socketRX.setSocketRX(request);
    }

    public void run(){
        while(true){
            try {
                this.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            for (Session session : WebSocketSession.sessions)
                if(session != null){
                    uavWebSocketHandler.onMessage(socketRX.getData(), session);
                }
        }
    }

}
