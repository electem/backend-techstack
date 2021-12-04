/**
 * 
 */
package net.guides.springboot.todomanagement.repository;
import java.util.List;
import javax.validation.Valid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import net.guides.springboot.todomanagement.model.Student;
/**
 * @author elect
 *
 */
@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
	/**
	 * search student name 
	 * @param studentId
	 * @return
	 */
	@Query(value = "SELECT s.student_name FROM student s  WHERE s.student_id =:studentId ", nativeQuery = true)
	public String finByStudentId(@Valid Long studentId);
	/**
	 * fetch subjects
	 * @param 
	 * @return
	 */
	@Query(value = "SELECT s.name FROM subject s WHERE s.st_id =:studentId ", nativeQuery = true)
	public List<String> finSubjectByStudentId(@Valid Long studentId);
	/**
	 * find student
	 * @param studentId
	 * @return
	 */
	@Query(value = "SELECT s.student_id,s.status,s.student_email,s.student_name FROM student s WHERE s.student_id=:studentId", nativeQuery = true)
	public Student findStudentId(@Valid long studentId);
	/**
	 * search student name
	 * @param studentName
	 */
	@Query(value = "SELECT  s.student_name FROM student s WHERE s.student_name=:studentName", nativeQuery = true)
	public String searchStudent(String studentName);
}
