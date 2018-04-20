package tools;

import pojos.User;
import staticClasses.AttributeNames;

import javax.servlet.http.HttpServletRequest;

/**
 * The Log system helps us to track our system
 */
public class Log {
    /**
     *
     * @param request to access the session to get user.
     * @param log will be recorded the database
     */
    public static void insertLog(HttpServletRequest request, String log){
        System.out.println(log);
        ((DatabaseHandler)request.getSession().getAttribute(AttributeNames.DATABASE_HANDLER)).insertLog((User)request.getSession().getAttribute(AttributeNames.USER),log);
    }
}
