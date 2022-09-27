package com.example.onetoonemapping.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.onetoonemapping.models.Test;
import com.example.onetoonemapping.repository.TestRepository;

@RestController
public class TestController {

	@Autowired
	TestRepository testRepository;

	@GetMapping("/tests")
	public List<Test> getTestList() {
		List<Test> tests = (List<Test>) testRepository.findAll();
		return tests;
	}
}
