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
                this.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            try{
                for (Session session : WebSocketSession.sessions){
                    if(session != null){
                        try{
                            String message = socketRX.getData();
                            uavWebSocketHandler.onMessage(message,session);
                        }catch (Exception e){
                            System.out.println(getClass().getName() + " has unknown problem ");
                        }catch (Throwable e){
                            System.out.println(getClass().getName() + " has problem threead dropped ");
                        }
                    }
                }
            }catch (Exception e){
                System.out.println(getClass().getName() + " Exception");

            }catch (Throwable e){
                System.out.println(getClass().getName() + " Throwed");
            }

        }
    }

}
