package servlets;

import network.SocketRX;
import network.UAVWebSocketHandler;
import staticClasses.AttributeNames;
import tools.WebSocketSession;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "UAVIndexServlet", urlPatterns = {"/uav_index"})
public class UAVIndexServlet extends HttpServlet {

    SocketRX socketRX = null;
    UAVWebSocketHandler uavWebSocketHandler = null;

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        socketRX = new SocketRX();
        uavWebSocketHandler = new UAVWebSocketHandler();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String data = socketRX.getData();
        //uavWebSocketHandler.onMessage("Test message", WebSocketSession.session);
        response.setContentType("text/plain");
        response.getWriter().write("TEST MESSAGE");
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("from UAV host is : " + request.getSession().getAttribute(AttributeNames.UAV_HOST_ADDRESS));
        socketRX.setSocketRX(request);
        getServletContext().getRequestDispatcher("/uav_index.jsp").forward(request,response);

    }
}
