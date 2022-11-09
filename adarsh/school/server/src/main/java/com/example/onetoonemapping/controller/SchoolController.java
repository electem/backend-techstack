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
import com.example.onetoonemapping.models.School;
import com.example.onetoonemapping.repository.SchoolRepository;

@RestController
@CrossOrigin
public class SchoolController {
private Logger log = LoggerFactory.getLogger(SchoolController.class);
	
	@Autowired
	private SchoolRepository schoolRepo;
	
	@GetMapping("/school")
	public  String getSchoolLis() {
		return "hiiiiiii";
	}
	
	@GetMapping("/schools")
	public List<School> getSchoolList() {
		log.info("Start of SchoolController :: getSchoolList ");
		List<School> listOfSchools = (List<School>) schoolRepo.findAll();
		log.info("End of SchoolController :: getSchoolList ");
		return listOfSchools;
	}
	
	@GetMapping("/school/{id}")
	public Optional<School> getSchoolById(@PathVariable(value = "id") Integer schoolId) {
		log.info("Start of SchoolController :: getStudentById ");
		Optional<School> school = schoolRepo.findById(schoolId);
		log.info("End of SchoolController :: getStudentById ");
		return school;
	}
	@PostMapping("/addSchools")
	public School addNewStudent(@Valid @RequestBody School school, BindingResult result, Model model) {
		log.info("Start of StudentController :: addNewStudent ");
		return schoolRepo.save(school);

	}
	@PutMapping("/updateSchoos")
	public School updateStudent(@Valid @RequestBody School school, BindingResult result, Model model) {
		log.info("Start of StudentController :: updateStudent ");
		return schoolRepo.save(school);
	}

}
