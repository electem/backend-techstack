package com.example.onetoonemapping.controller;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.onetoonemapping.models.Report;
import com.example.onetoonemapping.repository.ReportRepository;

@RestController
@CrossOrigin
public class ReportController {

	@Autowired
	ReportRepository reportRepository;

	@PostMapping("/createReport")
	public  Report createReport(@Valid @RequestBody Report report) {
		return reportRepository.save(report);
	}
}
