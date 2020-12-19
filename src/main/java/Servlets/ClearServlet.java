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

@WebServlet("/clear")
public class ClearServlet extends HttpServlet {
    @EJB
    private Points points;
    private UserDB userDB = new UserDB();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException, IOException {
        try {
            String clear = req.getParameter("clear");
            String username = req.getParameter("username");
            User user = userDB.findUserByUsername(username);
            System.out.println("works" + clear);
            int code = points.clear(user);
            if (code == 1) {
                resp.addHeader("Access-Control-Allow-Origin", "http://localhost:3355");
                resp.addHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
                resp.addHeader("Access-Control-Allow-Headers", "Content-Type");
                resp.addHeader("Origin", "http://localhost:3355");
                System.out.println("1");
                resp.getWriter().write("1");
            } else {
                System.out.println("nulllll");
                resp.getWriter().write("1");
            }
            System.out.println("clear finished");
        } catch (NumberFormatException | NullPointerException exception) {
            exception.printStackTrace();
        }
    }

}
