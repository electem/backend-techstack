package com.example.onetoonemapping.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailCntroller {
	
	@GetMapping("/api/sampleServce")
	public String getFoos() { 
	    return "title: ";
	}
}
