package com.example.manytomanymapping.controller;

import java.util.List;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.manytomanymapping.exceptions.ResourceNotFoundException;
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

	// This block of code is used to save a student to the DB.
	@PostMapping("/createStudent")
	public Student createStudent(@Valid @RequestBody Student student) {
		LOG.info("Start of StudentController :: createStudent");
		return studentRepository.save(student);
	}

	// This block of code is used to get a student by Id from DB.
	@GetMapping("/student/{id}")
	public ResponseEntity<Student> getStudentById(@PathVariable(value = "id") Integer id)
			throws ResourceNotFoundException {
		LOG.info("Start of StudentController :: getStudentById ");
		Student student = studentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Student not found :: " + id));
		LOG.info("End of StudentController :: getStudentById ");
		return ResponseEntity.ok().body(student);
	}

	// This block of code is used to update a student to the DB.
	@PutMapping("/updateStudent/{id}")
	public Student updateStudent(@PathVariable("id") int id, @Valid @RequestBody Student student) {
		LOG.info("Start of StudentController :: updateStudent ");
		return studentRepository.save(student);
	}

	// This method is used to delete student by id from DB.
	@DeleteMapping("/deleteStudent/{id}")
	public ResponseEntity<HttpStatus> deleteStudent(@PathVariable("id") int id) {
		LOG.info("Start of StudentController :: deleteStudent ");
		studentRepository.deleteById(id);
		LOG.info("End of StudentController :: deleteStudent ");
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}