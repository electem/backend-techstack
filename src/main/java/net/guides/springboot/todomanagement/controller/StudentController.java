/**
 * 
 */
package net.guides.springboot.todomanagement.controller;
import java.io.IOException;

import javax.mail.MessagingException;
import javax.validation.Valid;

import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import net.guides.springboot.todomanagement.exception.RoleNotFountExcpetion;
import net.guides.springboot.todomanagement.exception.StudentNotFoundException;
import net.guides.springboot.todomanagement.model.Student;
import net.guides.springboot.todomanagement.service.RoleService;
import net.guides.springboot.todomanagement.service.StudentService;
/**
 * @author elect
 *
 */
@RestController
@RequestMapping("/api")
public class StudentController {
    final private Logger logger = LoggerFactory.getLogger(StudentController.class);
	/**
	 * Inject studentService
	 */
	@Autowired
	private StudentService studentService;
	/**
	 * Inject roleService
	 */
	@Autowired
	private RoleService roleService;
	/**
	 * create student
	 * @param takes student details
	 * @return the student
	 * @throws MessagingException 
	 */
	@RequestMapping(value = "/add-student/{roleId}", method = RequestMethod.POST)
	public Student createStudent(@Valid @RequestBody final Student student,final @PathVariable long roleId) throws MessagingException {
		logger.info("Start of StudentController :: createStudent ");
		if(roleId == 0 || student == null) {
			throw new RoleNotFountExcpetion("Role id or student fields required");
		}
		else {
		final String roleName = roleService.getRoleName(roleId);
		Student createStudent = null;
		try {
			if (roleName.equals("admin")) {
				createStudent = studentService.createStudent(student);
				studentService.sendMail(student);
			}
			else {
				throw new RoleNotFountExcpetion();
			}
		}
		catch (RoleNotFountExcpetion exception) {
			logger.error("StudentController :: createStudent :: role name not found " + exception.getMessage());
			throw new RoleNotFountExcpetion("Sorry do not have permission !");
		}
		logger.info("End of StudentController :: createStudent " + createStudent.getStudentId());
		return createStudent;
		}
	}
	/**
	 * In this method update student status
	 * @param studentId
	 * @throws ParseException 
	 * @throws IOException 
	 */
	@RequestMapping(value = "/update-student", method = RequestMethod.GET)
	public void updateStudent(final @RequestParam long studentId) throws IOException, ParseException {
		logger.info("Start of StudentController :: updateStudent ");
		try {
			if (studentId != 0) {
				studentService.updateStudent(studentId);
				studentService.saveToFile(studentId);
			}
			else {
				throw new StudentNotFoundException();
			}
		} catch (StudentNotFoundException exception) {
			logger.error("StudentController :: updateStudent :: student Id Required " + exception.getMessage());
			throw new StudentNotFoundException("Student id is required ");
		}
		logger.info("End of StudentController :: updateStudent ");
	}
	/**
	 * @param studentName
	 * @return student subjects
	 * @throws IOException 
	 */
	@RequestMapping(value = "/readFile", method = RequestMethod.GET)
	public String readFile(final @RequestParam String name) throws IOException {
		logger.info("Start of StudentController :: readFile " + name);
		String subjects = null;
		try {
			if (name != null) {
				subjects = studentService.readFile(name);
			}
			else {
				throw new StudentNotFoundException();
			}
		} catch (Exception exception) {
			logger.error("StudentController :: readFile :: name is Required " + exception.getMessage());
			throw new StudentNotFoundException("Student name is required ");
		}
		logger.info("End of StudentController :: readFile " + name);
		return subjects;
	}
}
