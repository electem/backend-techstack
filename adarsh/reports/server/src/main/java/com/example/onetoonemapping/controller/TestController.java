package com.example.onetoonemapping.controller;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.onetoonemapping.models.Tests;
import com.example.onetoonemapping.repository.TestRepository;

@RestController
@CrossOrigin
public class TestController {
	
	private Logger log = LoggerFactory.getLogger(TestController.class);
	
	@Autowired
	TestRepository testRepository;

	@GetMapping("/tests")
	public List<Tests> getTestList() {
		log.info("Start of TestController :: getTestList ");
		List<Tests> tests = (List<Tests>) testRepository.findAll();
		return tests;
	}
}