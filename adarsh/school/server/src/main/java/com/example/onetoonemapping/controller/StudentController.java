package com.example.onetoonemapping.controller;

import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.onetoonemapping.models.Student;
import com.example.onetoonemapping.repository.StudentRepository;

@RestController
@CrossOrigin
public class StudentController {
	private Logger log = LoggerFactory.getLogger(StudentController.class);
	
	@Autowired
	private StudentRepository studentRepo;
	
	@GetMapping("/students")
	public List<Student> getStudentList() {
		log.info("Start of StudentController :: getStudentList ");
		List<Student> listOfStudents = (List<Student>) studentRepo.findAll();
		log.info("End of StudentController :: getStudentList ");
		return listOfStudents;
	}
	
	@GetMapping("/student/{id}")
	public Optional<Student> getStudentById(@PathVariable(value = "id") Integer studentId) {
		log.info("Start of StudentController :: getStudentById ");
		Optional<Student> student = studentRepo.findById(studentId);
		log.info("End of StudentController :: getStudentById ");
		return student;
	}
	
	@PostMapping("/addStudents")
	public Student addNewStudent(@Valid @RequestBody Student student, BindingResult result, Model model) {
		log.info("Start of StudentController :: addNewStudent ");
		return studentRepo.save(student);

	}
	@PutMapping("/updateStudent")
	public Student updateStudent(@Valid @RequestBody Student student, BindingResult result, Model model) {
		log.info("Start of StudentController :: updateStudent ");
		return studentRepo.save(student);
	}
}
