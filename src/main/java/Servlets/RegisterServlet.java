package Servlets;

import stateless.Login;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/register")
public class RegisterServlet extends HttpServlet {
    @EJB
    private Login login;

    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        System.out.println("works " + username);
        System.out.println("pas=" + password);
        String usr = login.register(username, password);
        if (usr != null) {
            resp.addHeader("Access-Control-Allow-Origin", "http://localhost:3355");
            resp.addHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
            resp.addHeader("Access-Control-Allow-Headers", "Content-Type");
            resp.addHeader("Origin", "http://localhost:3350");
            if (usr.equals("already registered")) {
                resp.getWriter().write("already registered");
            } else {
                resp.getWriter().write(usr);
            }
        } else {
            System.out.println("nulllll");
        }
    }
}
