package com.example.onetoonemapping.sql;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.coxautodev.graphql.tools.GraphQLRootResolver;
import com.example.onetoonemapping.models.Report;
import com.example.onetoonemapping.repository.ReportRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/rest/graphql")
public class Query implements GraphQLRootResolver {

	public Query(ReportRepository reportRepository) {
		super();
		this.reportRepository = reportRepository;
	}

	@Autowired
	private ReportRepository reportRepository;;

	@GetMapping("/list")
	public Iterable<Report> allOrders() {
		return reportRepository.findAll();
	}

}
