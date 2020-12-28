package database;

import model.User;

import javax.annotation.Resource;
import javax.ejb.Stateful;
import javax.inject.Named;
import javax.persistence.*;
import javax.transaction.SystemException;
import javax.transaction.UserTransaction;
import java.util.List;

@Named("userDB")
@Stateful
public class UserDB {
    private final EntityManager em = Persistence.
            createEntityManagerFactory("Web_4").
            createEntityManager();

    public void addNewUser(User user) {
        try {
            em.persist(user);
            em.flush();
        } catch (PersistenceException e) {
            user = null;
        }
    }

    public User findUserByUsername(String username) {
        return em.createNamedQuery("user.FindUser", User.class)
                .setParameter("username", username)
                .getResultStream().findAny().orElse(null);
    }
    public boolean removeUser(User user) {
        try {
            em.remove(em.getReference(User.class, user.getUsername()));
            em.flush();
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }
    public boolean saveUser(User user) {
        try {
            em.merge(user);
            em.flush();
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }

}
