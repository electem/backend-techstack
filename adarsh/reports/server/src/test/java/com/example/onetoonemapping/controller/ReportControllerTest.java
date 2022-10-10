package com.example.onetoonemapping.controller;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;
import java.util.ArrayList;
import java.util.List;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import com.example.onetoonemapping.models.Report;
import com.example.onetoonemapping.repository.ReportRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ReportControllerTest {
	List<Report> reports = new ArrayList<Report>();
	Report report = Report.builder().id(1).name("report").build();

	@MockBean
	ReportRepository reportRepository;

	@Test
	public void getReportList() {
		reports.add(report);
		when(reportRepository.findAll()).thenReturn(reports);
		assertEquals(reports.size(), ((List<Report>) reportRepository.findAll()).size());
	}

	@Test
	public void createReport() {
		reports.add(report);
		when(reportRepository.save(report)).thenReturn(report);
		assertEquals(report, reportRepository.save(report));

	}

}
