package model;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name = "pointEntity")

@Table(name = "points")
@NamedQuery(name = "pointEntity.FindByUser", query = "select point from pointEntity point where point.username = :username")

//@NamedQuery(name = "pointEntity.Clear", query = "delete from pointEntity AS point where point.username = :username")
public class PointEntity implements Serializable {

    @SequenceGenerator(name = "sequence", sequenceName = "SEQUENCE", allocationSize = 1, initialValue = 1)
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence")
    private long id;

    @ManyToOne
    @JoinColumn(name = "username", referencedColumnName = "username")
    private User username;

    private double x;
    private double y;
    private double r;
    private boolean result;

    public PointEntity() {
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public void setX(double x) {
        this.x = x;
    }

    public void setY(double y) {
        this.y = y;
    }

    public void setR(double r) {
        this.r = r;
    }

    public void setUsername(User username) {
        this.username = username;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public boolean isResult() {
        return result;
    }

    public long getId() {
        return this.id;
    }

    public User getUsername() {
        return username;
    }

    public boolean check(double x, double y, double r) {
//        return (x >= 0 && y >= 0 && x <= r && y <= r) ||
//                (x >= 0 && y <= 0 && x * x + y * y <= Math.pow(r, 2)) || (y <= (2 * x + r) && y >= 0 && x <= 0);
        if (r > 0)
        return (x >= 0 && y >= 0 && ((x*x) + (y*y) <= (r*r))) || (x <= 0 && y >= 0 && y <= r && x <= r/2)
                || (x >= 0 && y <= 0 && y >= x - r);
        else {
            double xx = -x;
            double yy = -y;
            double rr = -r;
            return (xx >= 0 && yy >= 0 && ((xx*xx) + (yy*yy) <= (rr*rr))) || (xx <= 0 && yy >= 0 && yy <= rr && x <= rr/2)
                    || (xx >= 0 && yy <= 0 && yy >= xx + rr);
        }
    }


    @Override
    public String toString() {
        return +x + " " + y + " " + r + " " + result;
    }
}
