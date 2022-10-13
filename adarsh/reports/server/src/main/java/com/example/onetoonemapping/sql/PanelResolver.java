package com.example.onetoonemapping.sql;

import org.springframework.stereotype.Component;

import com.coxautodev.graphql.tools.GraphQLResolver;
import com.example.onetoonemapping.models.Panel;
import com.example.onetoonemapping.models.Tests;
import com.example.onetoonemapping.repository.TestRepository;

@Component
public class PanelResolver implements GraphQLResolver<Panel> {
	private TestRepository testRepository;

	public PanelResolver(TestRepository testRepository) {
		this.testRepository = testRepository;
	}

	public Tests getAuthor(Panel panel) {
		return testRepository.findById(panel.getPanelId()).orElse(null);
	}
}
