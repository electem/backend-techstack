package com.example.manytomanymapping.controller;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.manytomanymapping.models.Student;
import com.example.manytomanymapping.repository.StudentRepository;

@RestController
@CrossOrigin
public class StudentController {

	/**
	 * Logger
	 */
	private static final Logger LOG = LoggerFactory.getLogger(StudentController.class);

	@Autowired
	StudentRepository studentRepository;

	// This block of code is used to get students list from DB.
	@GetMapping("/students")
	public List<Student> getStudentsList() {
		LOG.info("Start of StudentController :: getStudentsList ");
		List<Student> students = (List<Student>) studentRepository.findAll();
		LOG.info("End of StudentController :: getStudentsList ");
		return students;
	}
}