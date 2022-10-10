package com.example.onetoonemapping.controller;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;
import static org.mockito.Mockito.when;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import com.example.onetoonemapping.models.Panel;
import com.example.onetoonemapping.models.Tests;
import com.example.onetoonemapping.repository.PanelRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PanelControllerTest {
	List<Tests> tests = new ArrayList<Tests>();
	List<Panel> panels = new ArrayList<Panel>();
	Panel panel = Panel.builder().panelId(1).panelName("bbb").tests(tests).build();
	Tests test = Tests.builder().testId(1).testName("aaa").panels(panels).build();
	Tests test2 = Tests.builder().testId(2).testName("ccc").panels(panels).build();

	@MockBean
	PanelRepository panelRepository;
	
	@Test
	public void createPanel() {
		panels.add(panel);
		tests.add(test);
		tests.add(test2);
		when(panelRepository.save(panel)).thenReturn(panel);
		assertEquals(panel, panelRepository.save(panel));
		
	}
	@Test
	public void getPanelList() {
		panels.add(panel);
		tests.add(test);
		tests.add(test2);
		when(panelRepository.findAll()).thenReturn(panels);
		assertEquals(panels.size(), ((List<Panel>) panelRepository.findAll()).size());
	}
	@Test
	public void  updatePanel(){
		Panel panel = panelRepository.findById(1).get();
		panel.setPanelName("vvvv");
		panelRepository.save(panel);
		assertNotEquals(panel, panelRepository.findById(1).get().getPanelName());
	}
}
