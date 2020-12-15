package Servlets;

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

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException, IOException {
        try {
            String clear = req.getParameter("clear");
            String username = req.getParameter("username");
            //  boolean result = Boolean.parseBoolean(req.getParameter("result"));
            System.out.println("works" + clear);
            // if (clear.equals("yes")) {
            points.clear(username);/*
                resp.addHeader("Content-Type", "application/json");
                resp.addHeader("Access-Control-Allow-Origin", "*");
                resp.addHeader("Access-Control-Allow-Credentials", "true");
                resp.addHeader("Access-Control-Allow-Methods", "GET, POST");*/
            //  }
            System.out.println("clear finished");
        } catch (NumberFormatException | NullPointerException exception) {
            exception.printStackTrace();
        }
    }

}
