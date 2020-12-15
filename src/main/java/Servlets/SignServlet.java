package Servlets;

import stateless.Login;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/login")
public class SignServlet extends HttpServlet {
    @EJB
    private Login login;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException, IOException {
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        System.out.println("pas=" + password);
        String result = login.login(username, password);
        resp.addHeader("Access-Control-Allow-Origin", "http://localhost:3355");
        resp.addHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
        resp.addHeader("Access-Control-Allow-Headers", "Content-Type");
        resp.addHeader("Origin", "http://localhost:3355");
        if (result.equals("not registered")) {
            resp.setStatus(403);
            System.out.println("not registered");
        } else {
            if (result.equals("wrong password")) {
                System.out.println("wrong pass");
            } else {
                System.out.println("nice");
            }
            resp.getWriter().write(result);
        }
    }
}

