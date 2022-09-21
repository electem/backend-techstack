package com.example.onetoonemapping.controller;

import java.util.ArrayList;
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
		List<Object[]> list = reportRepository.getReportPanelTests();
		List<ReportPanelTests> reportPanelTestLists = new ArrayList<ReportPanelTests>();
		for (Object[] object : list) {
			ReportPanelTests report = new ReportPanelTests();
			report.setId((int) object[0]);
			report.setData((String) object[1]);
			report.setReportId((Integer) object[2]);
			report.setPanelId((Integer) object[3]);
			report.setTestId((Integer) object[4]);
			reportPanelTestLists.add(report);
		}
		Map<String, String> map = new HashMap<String, String>();
		for (ReportPanelTests reportPanelTest : reportPanelTestLists) {
			map.put(reportPanelTest.getPanelId() + " " + reportPanelTest.getTestId(),
					reportPanelTest.getData());
		}
		return map;
	}
}