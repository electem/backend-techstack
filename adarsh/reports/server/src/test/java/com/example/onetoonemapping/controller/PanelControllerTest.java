package com.example.onetoonemapping.controller;

import static org.junit.Assert.assertEquals;
import java.util.ArrayList;
import java.util.List;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import static org.mockito.Mockito.when;

import com.example.onetoonemapping.models.Panel;
import com.example.onetoonemapping.models.Tests;
import com.example.onetoonemapping.repository.PanelRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
class PanelControllerTest {

	List<Tests> tests = new ArrayList<Tests>();
	List<Panel> panels = new ArrayList<Panel>();
	Panel panel = new Panel(1, "adarsh", "angadi", tests);
	Tests test = new Tests(1, "blood test", panels);
	Tests test2 = new Tests(2, "sugar test", panels);

	@MockBean
	PanelRepository panelRepository;

	@Test
	public void getPanelList() {
		panels.add(panel);
		tests.add(test);
		tests.add(test2);
		when(panelRepository.findAll()).thenReturn(panels);
		assertEquals(panels.size(), ((List<Panel>) panelRepository.findAll()).size());
	}

	@Test
	public void createPanel() {
		panels.add(panel);
		tests.add(test);
		tests.add(test2);
		when(panelRepository.save(panel)).thenReturn(panel);
		assertEquals(panel, panelRepository.save(panel));
	}
}
