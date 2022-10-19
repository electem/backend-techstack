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
import com.example.postgresdemo.model.Subject;
import com.example.postgresdemo.repository.SubjectRepository;

public class SubjectController {
	@Autowired
	private SubjectRepository subjectRepository;

	// This method is used to get students data from the Database.
	@GetMapping("/subjectData")
	public List<Subject> getSubjectData() {
		return (List<Subject>) this.subjectRepository.findAll();
	}

	// This method is used to add students to Database
	@PostMapping("/addSubject")
	public String addSubject(@Valid @RequestBody Subject subject, BindingResult result3, Model model) {
		if (result3.hasErrors()) {
			return "addSubject";
		}
		subjectRepository.save(subject);
		return "Subject data added";
	}

	@PostMapping("/updateSubject/{id}")
	public String updateSubject(@PathVariable("id") int id, @Valid @RequestBody Subject subject, BindingResult result3,
			Model model) {
		if (result3.hasErrors()) {
			subject.setId(id);
			return "update-Subject";
		}
		subjectRepository.save(subject);
		return "Subject data updated";
	}

	// This method is used to delete a data from Database using student_id
	@GetMapping("/subjectData/{id}")
	public String deleteSubject(@PathVariable("id") int id, Model model) {
		Subject subject = subjectRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Invalid student id: " + id));
		subjectRepository.delete(subject);
		return "Subject data deleted";
	}

}
