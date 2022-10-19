package com.example.onetoonemapping.controller;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.onetoonemapping.models.Tests;
import com.example.onetoonemapping.repository.TestsRepository;

@RestController
@CrossOrigin
public class TestsController {

	/**
	 * Logger
	 */
	private static final Logger LOG = LoggerFactory.getLogger(TestsController.class);

	@Autowired
	TestsRepository testsRepository;

	// This block of code is used to get a tests list from the DB.
	@GetMapping("/tests")
	public List<Tests> getTestList() {
		LOG.info("Start of TestsController :: getTestList ");
		List<Tests> tests = (List<Tests>) testsRepository.findAll();
		LOG.info("Start of TestsController :: getTestList ");
		return tests;
	}
}