package stateless;

import database.UserDB;
import model.User;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Stateless
public class Login {
    @EJB
    private UserDB userDB;

    public String register(String username, String password){
        System.out.println("Login.register works");
        System.out.println(username+password);
        if (userDB.findUserByUsername(username) == null){
            User user = new User();
            user.setUsername(username);
            user.setPassword(hash(password));
            System.out.println("Login.register still works"+user.getUsername());
            userDB.addNewUser(user);
            return user.getUsername();
        } else{
            System.out.println("already registered");
            return "already registered";
        }
    }
    public User getUserByUsername(String username){
        return userDB.findUserByUsername(username);
    }

    public String login(String username, String password){
        System.out.println("Login.login works");
        User user = userDB.findUserByUsername(username);
        if (user != null){
            if (hash(password).equals(user.getPassword())) {
                return username;
            } else {
                return "wrong password";
            }
        } else {
            return "not registered";
        }
    }

    private String hash(String password){
        byte[] data1 = password.getBytes();
        try {
            MessageDigest sha1 = MessageDigest.getInstance("SHA-1");
            return new String(sha1.digest(data1));
        }catch (NoSuchAlgorithmException e){
            return null;
        }
    }
}
