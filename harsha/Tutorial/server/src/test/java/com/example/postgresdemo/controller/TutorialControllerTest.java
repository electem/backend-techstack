package com.example.postgresdemo.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import com.example.postgresdemo.model.Category;
import com.example.postgresdemo.model.Tutorial;
import com.example.postgresdemo.repository.TutorialRepository;

@SpringBootTest
class TutorialControllerTest {
	
	List<Category> categoryList = new ArrayList<Category>();
	List<Tutorial> tutorialList = new ArrayList<Tutorial>();
	Date date = new Date(07/07/2022);
	Tutorial tutorial = new Tutorial(1, "ABC", "training", "Europe/Amsterdam",date, categoryList);
	Category category1 = new Category(1, "java", tutorialList);
	Category category2 = new Category(2, "node", tutorialList);

	@MockBean
	TutorialRepository tutorialRepository;
	
	@Test
	public void addTutorial() {
		tutorialList.add(tutorial);
		categoryList.add(category1);
		categoryList.add(category2);
		when(tutorialRepository.save(tutorial)).thenReturn(tutorial);
		assertEquals(tutorial, tutorialRepository.save(tutorial));
	}

	@Test
	public void getTutorialData() {
		tutorialList.add(tutorial);
		categoryList.add(category1);
		categoryList.add(category2);
		when(tutorialRepository.findAll()).thenReturn(tutorialList);
		assertEquals(1, ((List<Tutorial>) tutorialRepository.findAll()).size());
	}
}
