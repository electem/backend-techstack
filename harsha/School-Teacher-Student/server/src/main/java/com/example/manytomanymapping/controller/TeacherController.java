package com.example.manytomanymapping.controller;

import java.util.List;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.manytomanymapping.models.Teacher;
import com.example.manytomanymapping.repository.TeacherRepository;

@RestController
@CrossOrigin
public class TeacherController {

	/**
	 * Logger
	 */
	private static final Logger LOG = LoggerFactory.getLogger(TeacherController.class);

	@Autowired
	TeacherRepository teacherRepository;

	// This block of code is used to get teachers list from DB.
	@GetMapping("/teachers")
	public List<Teacher> getTeachersList() {
		LOG.info("Start of TeacherController :: getTeachersList ");
		List<Teacher> teachers = (List<Teacher>) teacherRepository.findAll();
		LOG.info("End of TeacherController :: getTeachersList ");
		return teachers;
	}

	// This block of code is used to save a teacher to the DB.
	@PostMapping("/createTeacher")
	public Teacher createTeacher(@Valid @RequestBody Teacher teacher) {
		LOG.info("Start of TeacherController :: createTeacher");
		return teacherRepository.save(teacher);
	}
}