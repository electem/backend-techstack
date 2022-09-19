package com.example.onetoonemapping.controller;

import java.util.ArrayList;
import java.util.List;
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
	ReportRepository reportRepository;

	@PostMapping("/createReportPanelTests")
	public String createReportPanelTests(@Valid @RequestBody ReportPanelTest reportPanelTests) {
		reportRepository.createReportPanelTests(reportPanelTests.getData(), reportPanelTests.getReportID(),
				reportPanelTests.getPanelID(), reportPanelTests.getTestID());
		return "done";
	}

	@GetMapping("/ReportPanelTest")
	public List<ReportPanelTest> getReportPanelTest() {
		List<Object[]> list = reportRepository.getReportPanelTests();
		List<ReportPanelTest> listOfReportTestPanel = new ArrayList<ReportPanelTest>();
		for (Object[] a : list) {
			ReportPanelTest report = new ReportPanelTest();
			report.setId((Integer) a[0]);
			report.setData((String) a[1]);			
			report.setReportID((Integer) a[2]);
			report.setPanelID((Integer) a[3]);
			report.setTestID((Integer) a[4]);
			listOfReportTestPanel.add(report);
		}
		return listOfReportTestPanel;
	}
}
