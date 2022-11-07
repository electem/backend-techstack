package com.example.manytomanymapping.controller;

import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
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
}