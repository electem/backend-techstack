package com.example.onetoonemapping.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.validation.Valid;
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

	@Autowired
	ReportRepository reportRepository;

	@PostMapping("/createReportPanelTests")
	public ReportPanelTests createReportPanelTests(@Valid @RequestBody ReportPanelTests reportPanelTests) {
		return reportRepository.createReportPanelTests(reportPanelTests.getData(), reportPanelTests.getReportId(),
				reportPanelTests.getPanelId(), reportPanelTests.getTestId());
	}

	@GetMapping("/reportPanelTests")
	public Map<String, String> getReportPanelTest() {
		List<Object[]> reportPanelTestLists = reportRepository.getReportPanelTests();
		Map<String, String> map = new HashMap<String, String>();
		for (Object[] object : reportPanelTestLists) {
			map.put(object[3] + "_" + object[4], (String) object[1]);
		}
		return map;
	}
}