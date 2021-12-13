/**
 * 
 */
package net.guides.springboot.todomanagement.controller;
import java.io.IOException;

import javax.mail.MessagingException;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;

import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
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
@Slf4j
public class StudentController {
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
	 * roleName
	 */
	private String roleName;
	/**
	 * createStudent
	 */
	private Student createStudent;
	/**
	 * create student
	 * @param takes student details
	 * @return the student
	 * @throws MessagingException 
	 */
	@RequestMapping(value = "/add-student/{roleId}", method = RequestMethod.POST)
	public Student createStudent(@Valid @RequestBody final Student student,final @PathVariable long roleId) throws MessagingException {
		log.info("Start of StudentController :: createStudent ");
		if(roleId != 0) {
			roleName = roleService.getRoleName(roleId);
		}
		if (roleName == null ||roleId ==0) {
			throw new RoleNotFountExcpetion();
		}
		if ("ADMIN".equals(roleName)) {
			createStudent = studentService.createStudent(student);
			studentService.sendMail(student);
		} else {
			throw new RoleNotFountExcpetion();
		}
		log.info("End of StudentController :: createStudent " + createStudent.getStudentId());
		return createStudent;
	}
	/**
	 * In this method update student status
	 * @param studentId
	 * @throws ParseException 
	 * @throws IOException 
	 */
	@RequestMapping(value = "/update-student", method = RequestMethod.GET)
	public void updateStudent(final @RequestParam long studentId)  {
		log.info("Start of StudentController :: updateStudent ");
		try {
			if (studentId != 0) {
				studentService.updateStudent(studentId);
				studentService.saveToFile(studentId);
			} else {
				throw new StudentNotFoundException();
			}
		} catch (IOException | ParseException exception) {
			log.error("StudentController :: updateStudent :: student Id Required " + exception.getMessage());
		}
		log.info("End of StudentController :: updateStudent ");
	}
	/**
	 * @param studentName
	 * @return student subjects
	 * @throws IOException 
	 */
	@RequestMapping(value = "/readFile", method = RequestMethod.GET)
	public String readFile(final @RequestParam(required = false) @Valid @NotEmpty String name) throws IOException {
		log.info("Start of StudentController :: readFile " + name);
		String subjects = null;
		try {
			if (name != null) {
				subjects = studentService.readFile(name);
			} else {
				throw new StudentNotFoundException();
			}
		} catch (IOException exception) {
			log.error("StudentController :: readFile " + exception.getMessage());
			throw new IOException(exception);
		}
		return subjects;
	}
}
