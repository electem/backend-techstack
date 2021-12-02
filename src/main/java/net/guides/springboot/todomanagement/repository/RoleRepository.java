/**
 * 
 */
package net.guides.springboot.todomanagement.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import net.guides.springboot.todomanagement.model.Role;



/**
 * @author elect
 *
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

	
	
	@Query(value = "SELECT r.name FROM roles r WHERE r.role_id= :roleId ",nativeQuery = true)
	public String getRoleName(@Param("roleId")Long roleId);

}
