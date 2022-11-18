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
import com.example.manytomanymapping.models.School;
import com.example.manytomanymapping.repository.SchoolRepository;

@RestController
@CrossOrigin
public class SchoolController {

	/**
	 * Logger
	 */
	private static final Logger LOG = LoggerFactory.getLogger(SchoolController.class);

	@Autowired
	SchoolRepository schoolRepository;

	// This block of code is used to save a school to the DB.
	@PostMapping("/createSchool")
	public School createSchool(@Valid @RequestBody School school) {
		LOG.info("Start of SchoolController :: createSchool");
		return schoolRepository.save(school);
	}

	// This block of code is used to get schools list from DB.
	@GetMapping("/schools")
	public List<School> getSchoolsList() {
		LOG.info("Start of SchoolController :: getSchoolsList ");
		List<School> schools = (List<School>) schoolRepository.findAll();
		LOG.info("End of SchoolController :: getSchoolsList ");
		return schools;
	}

	// This block of code is used to get a school by Id from DB.
	@GetMapping("/school/{id}")
	public ResponseEntity<School> getSchoolById(@PathVariable(value = "id") Integer id)
			throws ResourceNotFoundException {
		LOG.info("Start of SchoolController :: getSchoolById ");
		School school = schoolRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("School not found :: " + id));
		LOG.info("End of SchoolController :: getSchoolById ");
		return ResponseEntity.ok().body(school);
	}

	// This block of code is used to update a school to the DB.
	@PutMapping("/updateSchool/{id}")
	public School updateSchool(@PathVariable("id") int id, @Valid @RequestBody School school) {
		LOG.info("Start of SchoolController :: updateSchool ");
		return schoolRepository.save(school);
	}

	// This method is used to delete school by id from DB.
	@DeleteMapping("/deleteSchool/{id}")
	public ResponseEntity<HttpStatus> deleteSchool(@PathVariable("id") int id) {
		LOG.info("Start of SchoolController :: deleteSchool ");
		schoolRepository.deleteById(id);
		LOG.info("End of SchoolController :: deleteSchool ");
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}