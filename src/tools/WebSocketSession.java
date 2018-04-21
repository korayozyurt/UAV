package tools;

import javax.websocket.Session;
import java.util.ArrayList;

public class WebSocketSession {

    /**
     * TomCat Server cannot provide us session.
     * if multiple users will use this system then convert it to arraylist or another
     * implementation.
     * If just one session is here, then just last user can get the system messages.
     */
    public static ArrayList<Session> sessions = new ArrayList<>();
}
