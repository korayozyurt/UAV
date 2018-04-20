package network;

import tools.WebSocketSession;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;


@ServerEndpoint("/UAVWebSocketEndPoint")
public class UAVWebSocketHandler {

    public UAVWebSocketHandler() {
    }

    /**
     * in the on open method, system set the static session as the
     * coming session to send some messages to jsp page continously.
     * @param session is setted as static session to use all system.
     */
    @OnOpen
    public void onOpen(Session session){
        System.out.println(session.getId() + " had opened the connection");
        WebSocketSession.session = session;
        try{
            session.getBasicRemote().sendText("Connectioon Established\n");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @OnMessage
    public void onMessage(String message, Session session){
        System.out.println("Message from " + session.getId() + ": " + message);
        try {
            session.getBasicRemote().sendText("Test Message");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }



    @OnClose
    public void onClose(Session session){
        System.out.println("Session " + session.getId() + " has ended");
    }

    @OnError
    public void onError(Throwable e){
        e.printStackTrace();
    }

}
