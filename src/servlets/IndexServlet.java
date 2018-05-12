package servlets;

import pojos.User;
import staticClasses.AttributeNames;
import tools.DatabaseHandler;
import tools.Log;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Index page includes a login page and keeps some variables
 */

@WebServlet(name = "IndexServlet", urlPatterns = {"/index"})
public class IndexServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        DatabaseHandler databaseHandler = new DatabaseHandler();
        request.getSession().setAttribute(AttributeNames.DATABASE_HANDLER,databaseHandler);
        User user  = databaseHandler.getUser(request.getParameter(AttributeNames.USER_NAME), request.getParameter(AttributeNames.PASSWORD));
        if(user == null ){
            request.getSession().setAttribute(AttributeNames.WARNING_MESSAGE,"username or password is incorrect!");
            getServletContext().getRequestDispatcher("/index.jsp").forward(request,response);
        }else{
            /**
             * else go to the uav control page
             */
            request.getSession().setAttribute(AttributeNames.WARNING_MESSAGE,"");        //clear to warning
            request.getSession().setAttribute(AttributeNames.USER,user);
            Log.insertLog(request, user.getUsername() + " has been logged in");
            if(user.getRole() == 1){

                /**
                 * uav host addressm port number and web socket session attributes
                 * are setted here
                 */
                request.getSession().setAttribute(AttributeNames.UAV_HOST_ADDRESS,request.getParameter(AttributeNames.UAV_HOST_ADDRESS));
                request.getSession().setAttribute(AttributeNames.UAV_HOST_RX_PORT_NUMBER,5000);
                request.getSession().setAttribute(AttributeNames.UAV_HOST_TX_PORT_NUMBER,5001);
                response.sendRedirect("uav_index");
            }

        }
    }

    /**
     *  uav Web socket handler is created because,
     *  socket handler will set the user session by the request and
     *  next page can use the session parameter.
     *
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        getServletContext().getRequestDispatcher("/index.jsp").forward(request,response);
    }
}
