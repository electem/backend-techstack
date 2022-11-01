package com.example.onetoonemapping.controller;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.onetoonemapping.exceptions.ResourceNotFoundException;
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
	/**
	 * Logger
	 */
	private static final Logger LOG = LoggerFactory.getLogger(ReportController.class);

	@Autowired
	ReportRepository reportRepository;

	// This block of code is used to save a report to the DB.
	@PostMapping("/createReport")
	public Report createReport(@Valid @RequestBody Report report) {
		LOG.info("Start of ReportController :: createReport ");
		return reportRepository.save(report);
	}

	// This block of code is used to get a reports list from the DB.
	@GetMapping("/reports")
	public List<Report> getReportList() {
		LOG.info("Start of ReportController :: getReportList ");
		List<Report> reports = reportRepository.getReports();
		return reports;
	}

	// This block of code is used to get a report by reportId from the DB.
	@GetMapping("/reports/{id}")
	public ResponseEntity<Report> getReportById(@PathVariable(value = "id") Integer id)
			throws ResourceNotFoundException {
		LOG.info("Start of ReportController :: getReportById ");
		Report report = reportRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Report not found :: " + id));
		LOG.info("End of ReportController :: getReportById ");
		return ResponseEntity.ok().body(report);
	}
}
