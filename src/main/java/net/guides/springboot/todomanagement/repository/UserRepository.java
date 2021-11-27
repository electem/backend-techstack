/**
 * 
 */
package net.guides.springboot.todomanagement.repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import net.guides.springboot.todomanagement.model.User;

/**
 * @author elect
 *
 */
public interface UserRepository extends JpaRepository<User, Long> {
	 
    @Query("SELECT u FROM User u WHERE u.username = :username")
    public User getUserByUsername(@Param("username") String username);
}