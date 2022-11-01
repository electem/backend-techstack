package com.example.onetoonemapping.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.onetoonemapping.models.ReportPanelTests;
import com.example.onetoonemapping.repository.ReportRepository;

@RestController
@CrossOrigin
public class ReportPanelTestsController {

	/**
	 * Logger
	 */
	private static final Logger LOG = LoggerFactory.getLogger(ReportPanelTestsController.class);

	@Autowired
	ReportRepository reportRepository;

	// This block of code is used to save a reportPanelTests to the DB.
	@PostMapping("/createReportPanelTests")
	public ReportPanelTests createReportPanelTests(@Valid @RequestBody ReportPanelTests reportPanelTests) {
		LOG.info("Start of ReportPanelTestsController :: createReportPanelTests ");
		return reportRepository.createReportPanelTests(reportPanelTests.getData(), reportPanelTests.getReportId(),
				reportPanelTests.getPanelId(), reportPanelTests.getTestId());
	}

	// This block of code is used to get a reportPanelTests list from the DB.
	@GetMapping("/reportPanelTests")
	public Map<String, String> getReportPanelTest() {
		LOG.info("Start of ReportPanelTestsController :: getReportPanelTest ");
		List<Object[]> reportPanelTestLists = reportRepository.getReportPanelTests();
		Map<String, String> map = new HashMap<String, String>();
		for (Object[] object : reportPanelTestLists) {
			map.put(object[3] + "_" + object[4], (String) object[1]);
		}
		LOG.info("End of ReportPanelTestsController :: getReportPanelTest ");
		return map;
	}
}