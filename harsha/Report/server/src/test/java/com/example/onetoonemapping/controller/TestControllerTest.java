package com.example.onetoonemapping.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import com.example.onetoonemapping.models.Panel;
import com.example.onetoonemapping.models.Tests;
import com.example.onetoonemapping.repository.TestsRepository;

@SpringBootTest
class TestControllerTest {

	List<Tests> tests = new ArrayList<Tests>();
	List<Panel> panels = new ArrayList<Panel>();
	Panel panel = Panel.builder().id(1).name("ABC").description("xyz").tests(tests).build();
	Tests test = Tests.builder().id(1).name("blood test").panels(panels).build();
	Tests test2 = Tests.builder().id(2).name("sugar test").panels(panels).build();

	@MockBean
	TestsRepository testsRepository;

	@Test
	public void getTestList() {
		tests.add(test);
		tests.add(test2);
		when(testsRepository.findAll()).thenReturn(tests);
		assertEquals(tests.size(), ((List<Tests>) testsRepository.findAll()).size());
	}
}