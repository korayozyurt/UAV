package servlets;

import network.SocketTX;
import staticClasses.AttributeNames;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "SocketTXServlet", urlPatterns = {"/SocketTX"})
public class SocketTXServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        SocketTX socketTX = (SocketTX) request.getSession().getAttribute(AttributeNames.UAV_SOCKET_TX);
        String value = request.getParameter("message");
        socketTX.sendData(value);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
