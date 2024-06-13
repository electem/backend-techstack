/**
 * 
 */
package net.guides.springboot.todomanagement.controller;

import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
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
	 * @param 
	 * @return
	 */
	@RequestMapping(value = "/add-student/{roleId}", method = RequestMethod.POST)
	public Student createStudent(@Valid @RequestBody final Student student,final @PathVariable long roleId) {
		logger.info("Start of StudentController :: createStudent ");
		final String roleName = roleService.getRoleName(roleId);
		Student createStudent = null;
		try {
			if (roleName.equals("admin") && student!=null) {
				createStudent = studentService.createStudent(student);
			}
		} catch (Exception exception) {
			logger.error("StudentController :: createStudent :: student details Required "+exception.getMessage());
		}
		logger.info("End of StudentController :: createStudent "+createStudent.getStudentId());
		return createStudent; 
	}
	
}
