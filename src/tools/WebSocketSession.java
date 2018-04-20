package tools;

import javax.websocket.Session;

/**
 * TomCat Server cannot provide us session.
 * if multiple users will use this system then convert it to arraylist or another
 * implementation.
 * If just one session is here, then just last user can get the system messages.
 */

public class WebSocketSession {
    public static Session session;
}
