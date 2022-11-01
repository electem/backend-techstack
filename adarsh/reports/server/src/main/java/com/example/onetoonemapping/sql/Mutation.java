package com.example.onetoonemapping.sql;

import org.springframework.stereotype.Component;
import com.coxautodev.graphql.tools.GraphQLRootResolver;
import com.example.onetoonemapping.models.Panel;
import com.example.onetoonemapping.repository.PanelRepository;
import com.example.onetoonemapping.repository.TestRepository;

@Component
public class Mutation implements GraphQLRootResolver {

	private PanelRepository panelRepository;
	private TestRepository testRepository;

	public Mutation(PanelRepository panelRepository, TestRepository testRepository) {
		super();
		this.panelRepository = panelRepository;
		this.testRepository = testRepository;
	}

	public Panel newPanel(String panelDescription, String panelName, int panelId) {
		Panel panel = new Panel();
		panel.setPanelDescription(panelDescription);
		panel.setPanelId(panelId);
		panel.setPanelName(panelName);
		panelRepository.save(panel);
		return panel;
	}

}
