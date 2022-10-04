package com.example.onetoonemapping.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import com.example.onetoonemapping.models.Panel;
import com.example.onetoonemapping.models.Tests;
import com.example.onetoonemapping.repository.PanelRepository;

@SpringBootTest
class PanelControllerTest {

	List<Tests> tests = new ArrayList<Tests>();
	List<Panel> panels = new ArrayList<Panel>();
	Panel panel = Panel.builder().id(1).name("ABC").description("xyz").tests(tests).build();
	Panel panel2 = Panel.builder().id(2).name("Panel2").description("abc").tests(tests).build();
	Tests test = Tests.builder().id(1).name("blood test").panels(panels).build();
	Tests test2 = Tests.builder().id(2).name("sugar test").panels(panels).build();

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
