package com.example.postgresdemo.controller;

import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.postgresdemo.model.StudentModel;
import com.example.postgresdemo.repository.StudentModelRepository;

@RestController
public class StudentModelController {

	private final StudentModelRepository studentModelRepository;

	@Autowired
	public StudentModelController(StudentModelRepository studentModelRepository) {
		this.studentModelRepository = studentModelRepository;
	}

	// This method is used to get students data from the Database.
	@GetMapping("/studentModelData")
	public List<StudentModel> getStudentModelData() {
		return (List<StudentModel>) this.studentModelRepository.findAll();
	}

	// This method is used to add students to Database
	@PostMapping("/addStudentModel")
	public String addStudentModel(@Valid @RequestBody StudentModel studentModel, BindingResult result2, Model model) {
		if (result2.hasErrors()) {
			return "addStudentModel";
		}
		studentModelRepository.save(studentModel);
		return "StudentModel data added";
	}

	// This method is used to update students data into Database using student_id
	@PostMapping("/updateModel/{id}")
	public String updateStudentModel(@PathVariable("id") int id, @Valid @RequestBody StudentModel studentModel,
			BindingResult result2, Model model) {
		if (result2.hasErrors()) {
			studentModel.setId(id);
			return "update-studentModel";
		}
		studentModelRepository.save(studentModel);
		return "StudentModel data updated";
	}

	// This method is used to delete a data from Database using student_id
	@GetMapping("/studentModelData/{id}")
	public String deleteStudent(@PathVariable("id") int id, Model model) {
		StudentModel studentModel = studentModelRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Invalid student id: " + id));
		studentModelRepository.delete(studentModel);
		return "StudentModel data deleted";
	}
}
