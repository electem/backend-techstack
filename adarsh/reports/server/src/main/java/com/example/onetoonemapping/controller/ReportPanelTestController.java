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
	public Map getReportPanelTest() {
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
		Map reportTestPanelList = new HashMap();
		for (ReportPanelTest reportData : listOfReportTestPanel) {
			reportTestPanelList.put(reportData.getPanelID() + "" + reportData.getTestID(), reportData.getData());

		}
		return reportTestPanelList;
	}
}
