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
import com.example.onetoonemapping.models.ReportPanelTest;
import com.example.onetoonemapping.repository.ReportRepository;

@RestController
@CrossOrigin
public class ReportPanelTestController {

	@Autowired
	private ReportRepository reportRepository;

	@PostMapping("/createReportPanelTests")
	public String createReportPanelTests(@Valid @RequestBody ReportPanelTest reportPanelTests) {
		reportRepository.createReportPanelTests(reportPanelTests.getData(), reportPanelTests.getReportID(),
				reportPanelTests.getPanelID(), reportPanelTests.getTestID());
		return "done";
	}

	@GetMapping("/ReportPanelTest")
	public Map<String, String> getReportPanelTest() {
		List<Object[]> reportList = reportRepository.getReportPanelTests();
		Map<String, String> reportTestPanelList = new HashMap<String, String>();
		for (Object[] reportData : reportList) {
			reportTestPanelList.put(reportData[3] + "_" + reportData[4], (String) reportData[1]);
		}
		return reportTestPanelList;
	}
}
