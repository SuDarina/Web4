
package database;

import model.PointEntity;
import model.User;

import javax.ejb.Stateful;
import javax.inject.Named;
import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

@Named("pointDB")
@Stateful
public class PointsDB implements Serializable {
    private final EntityManager em = Persistence.
            createEntityManagerFactory("Web_4").
            createEntityManager();
    public void addNewPoint(PointEntity point) {
        try {
            em.persist(point);
            em.flush();
        } catch (PersistenceException e) {
            point = null;
        }

    }

    public List<PointEntity> getPoints(User user) {
        System.out.println("in pointsDB");
        return em.createNamedQuery("pointEntity.FindByUser", PointEntity.class)
                .setParameter("username", user).getResultStream().collect(Collectors.toList());
    }

    public int clear(User user) {
        System.out.println(user.getUsername());
        List<PointEntity> pointEntities = getPoints(user);
        for (PointEntity p: pointEntities) {
            System.out.println(p.toString());
            em.remove(p);
        }
        System.out.println("pointsDb.clear");
        return 1;
    }
}

