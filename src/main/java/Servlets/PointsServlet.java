package Servlets;

import stateless.Points;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/main")
public class PointsServlet extends HttpServlet {
    @EJB
    private Points points;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException, IOException {
        try {
            System.out.println(req.getParameter("x"));
            System.out.println(req.getParameter("y"));
            System.out.println(req.getParameter("r"));
            double x = Double.parseDouble(req.getParameter("x"));
            double y = Double.parseDouble(req.getParameter("y"));
            double r = Double.parseDouble(req.getParameter("r"));
            boolean result = Boolean.parseBoolean(req.getParameter("result"));
            System.out.println(req.getParameter("username"));
            String username = req.getParameter("username");
            System.out.println("works" + x + y + r);
            points.addPoint(x,y,r, result, username);
            resp.addHeader("Access-Control-Allow-Origin", "http://localhost:3355");
            resp.addHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
            resp.addHeader("Access-Control-Allow-Headers", "Content-Type");
            resp.addHeader("Origin", "http://localhost:3355");
            System.out.println("pointsServlet finished");
            resp.getWriter().write("success");
        } catch (NumberFormatException | NullPointerException exception) {
            exception.printStackTrace();
        }
    }
}
