package Servlets;

import database.UserDB;
import model.User;
import stateless.Points;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/load")
public class SendPointsServlet extends HttpServlet {
    @EJB
    private Points points;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException, IOException {
        try{
            String username = req.getParameter("username");
            String answer = points.getPoints(username);
            if (answer.equals("Register")) {
                resp.setStatus(403);
            }
            resp.addHeader("Access-Control-Allow-Origin", "http://localhost:3355");
            resp.addHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
            resp.addHeader("Access-Control-Allow-Headers", "Content-Type");
            resp.addHeader("Origin", "http://localhost:3355");
            System.out.println("SendPointsServlet finished");
            resp.getWriter().write(answer);

        } catch (NumberFormatException | NullPointerException e) {
            e.printStackTrace();
        }
    }
}
