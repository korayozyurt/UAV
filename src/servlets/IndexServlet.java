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
                 *
                 *
                 * THERE ARE THE INFORMATIONS FILL BE FILLED BY |UsER!!!!!!
                 *
                 */
                request.getSession().setAttribute(AttributeNames.UAV_HOST_ADDRESS,"127.0.0.1");
                request.getSession().setAttribute(AttributeNames.UAV_HOST_PORT_NUMBER,5000);
                response.sendRedirect("uav_index");
            }

        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        getServletContext().getRequestDispatcher("/index.jsp").forward(request,response);
    }
}
