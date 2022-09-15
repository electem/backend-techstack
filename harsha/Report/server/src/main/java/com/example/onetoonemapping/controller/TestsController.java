package com.example.onetoonemapping.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.onetoonemapping.models.Tests;
import com.example.onetoonemapping.repository.TestsRepository;

@RestController
@CrossOrigin
public class TestsController {

	@Autowired
	TestsRepository testsRepository;

	@GetMapping("/tests")
	public List<Tests> getTestList() {
		List<Tests> tests =  (List<Tests>) testsRepository.findAll();
		return tests;
	}
}
