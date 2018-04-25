package servlets;

import network.SocketTX;
import network.UAVWebSocketHandler;
import staticClasses.AttributeNames;
import thread.SocketRXThread;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "UAVIndexServlet", urlPatterns = {"/uav_index"})
public class UAVIndexServlet extends HttpServlet {

    private SocketRXThread socketRXThread= null;

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        socketRXThread = new SocketRXThread("socketRXThread");
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("from UAV host is : " + request.getSession().getAttribute(AttributeNames.UAV_HOST_ADDRESS));
        socketRXThread.setSocketRXThread(request);
        socketRXThread.start();

        /**
         * I must create a socket TX then put session Attribute
         * then the socket is accessed from socketTXServlet
         * socketTXServlet is called by jquery using ajax in web page.
         */
        SocketTX socketTX = new SocketTX();
        socketTX.setSocketTX(request);
        request.getSession().setAttribute(AttributeNames.UAV_SOCKET_TX,socketTX);
        getServletContext().getRequestDispatcher("/uav_index.jsp").forward(request,response);

    }

    @Override
    public void destroy() {
        super.destroy();
        socketRXThread.destroy();
    }
}
