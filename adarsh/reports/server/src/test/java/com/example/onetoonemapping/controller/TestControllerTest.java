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

import com.example.onetoonemapping.models.Panel;
import com.example.onetoonemapping.models.Tests;
import com.example.onetoonemapping.repository.TestRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TestControllerTest {

	List<Tests> tests = new ArrayList<Tests>();
	List<Panel> panels = new ArrayList<Panel>();
	Panel panel = new Panel(1, "ABC", "xyz", tests);
	Tests test = new Tests(1, "blood test", panels);
	Tests test2 = new Tests(2, "sugar test", panels);

	@MockBean
	TestRepository testRepository;
	
	@Test
	public void getTestList() {
		panels.add(panel);
		tests.add(test);
		tests.add(test2);
		when(testRepository.findAll()).thenReturn(tests);
		assertEquals(tests.size(), ((List<Tests>) testRepository.findAll()).size());
	}
	

}
