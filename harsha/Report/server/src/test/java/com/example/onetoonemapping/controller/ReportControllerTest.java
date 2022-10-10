package com.example.onetoonemapping.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import com.example.onetoonemapping.models.Report;
import com.example.onetoonemapping.repository.ReportRepository;

@SpringBootTest
class ReportControllerTest {

	@MockBean
	ReportRepository reportRepository;

	List<Report> reports = new ArrayList<Report>();
	Report report = Report.builder().id(1).name("abc").build();
	Report report2 = Report.builder().id(2).name("xyz").build();

	@Test
	public void createReport() {
		when(reportRepository.save(report)).thenReturn(report);
		assertEquals(report, reportRepository.save(report));
	}

	@Test
	public void getReportList() {
		reports.add(report);
		reports.add(report2);
		when(reportRepository.findAll()).thenReturn(reports);
		assertEquals(reports.size(), ((List<Report>) reportRepository.findAll()).size());
	}
}