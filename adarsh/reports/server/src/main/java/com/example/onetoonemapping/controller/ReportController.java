package com.example.onetoonemapping.controller;

import java.util.List;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.onetoonemapping.models.Report;
import com.example.onetoonemapping.repository.ReportRepository;

@RestController
@CrossOrigin
public class ReportController {
	private Logger log = LoggerFactory.getLogger(ReportController.class);

	@Autowired
	ReportRepository reportRepository;

	/**
	 * @GetMapping
	 * @return list of report
	 */
	@GetMapping("/report")
	public List<Report> getReportList() {
		log.info("Start of ReportController :: getReportList ");
		List<Report> listOfeport = (List<Report>) reportRepository.findAll();
		log.info("End of ReportController :: getReportList ");
		return listOfeport;
	}

	/**
	 * @GetMapping
	 * @param report
	 * @return list of report
	 */
	@PostMapping("/createReport")
	public Report createReport(@Valid @RequestBody Report report) {
		log.info("Start of ReportController :: createReport ");
		return reportRepository.save(report);

	}
}