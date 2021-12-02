/**
 * 
 */
package net.guides.springboot.todomanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.guides.springboot.todomanagement.model.Student;

/**
 * @author elect
 *
 */
@Repository
public interface StudentRepository extends JpaRepository<Student, Long>{

}
