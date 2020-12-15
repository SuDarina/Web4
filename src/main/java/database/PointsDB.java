
package database;

import model.PointEntity;
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

    public List<PointEntity> getPoints(String username) {
        return em.createNamedQuery("pointEntity.FindByUser", PointEntity.class)
                .setParameter("username", username).getResultStream().collect(Collectors.toList());
    }

    public void clear(String username) {
        System.out.println("pointsDb.clear");
        em.createNamedQuery("pointEntity.Clear", PointEntity.class)
                .setParameter("username", username).executeUpdate();
    }
}

