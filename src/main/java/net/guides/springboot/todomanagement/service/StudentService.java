/**
 * 
 */
package net.guides.springboot.todomanagement.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.guides.springboot.todomanagement.model.Student;
import net.guides.springboot.todomanagement.repository.StudentRepository;

/**
 * @author elect
 *
 */
@Service
public class StudentService {
	
	/**
	 * logger
	 */
	final private Logger logger = LoggerFactory.getLogger(StudentService.class);
	
	/**
	 * Inject to StudentRepository
	 */
	@Autowired
	private StudentRepository studentRepository;

	/**
	 * creating the student
	 * @param student
	 * @return
	 */
	public Student createStudent(final Student student) 
	{
		logger.info("start of StudentService :: createStudent ");
		Student saveStudent = null;
		if (student.getStudentEmail() != null) {
			saveStudent = studentRepository.save(student);
		}
		logger.info("end of StudentService :: createStudent "+saveStudent);
		return saveStudent;
	}

	/**
	 * student service constructor
	 */
	public StudentService() {
		super();
	}
	
}
