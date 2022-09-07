package com.example.postgresdemo.controller;

import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.postgresdemo.exception.ResourceNotFoundException;
import com.example.postgresdemo.model.Tutorial;
import com.example.postgresdemo.repository.TutorialRepository;

@RestController
@CrossOrigin
public class TutorialController {

	private final TutorialRepository tutorialRepository;

	@Autowired
	public TutorialController(TutorialRepository tutorialRepository) {
		this.tutorialRepository = tutorialRepository;
	}

	// This method is used to get tutorial by id data from the Database.
	@GetMapping("/tutorials/{id}")
	public ResponseEntity<Tutorial> getTutorialById(@PathVariable(value = "id") Integer tutorialId)
			throws ResourceNotFoundException {
		Tutorial tutorial = tutorialRepository.findById(tutorialId)
				.orElseThrow(() -> new ResourceNotFoundException("Tutorial not found :: " + tutorialId));

		return ResponseEntity.ok().body(tutorial);
	}

	// This method is used to get tutorials data from the Database.
	@GetMapping("/tutorials")
	public List<Tutorial> getTutorialData() {
		List<Tutorial> tutorials = (List<Tutorial>) this.tutorialRepository.findAll();
		return tutorials;
	}

	// This method is used to add tutorials to Database
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/addTutorials")
	public String addTutorial(@Valid @RequestBody Tutorial tutorial, BindingResult result2, Model model) {
		if (result2.hasErrors()) {
			return "tutorial";
		}
		tutorialRepository.save(tutorial);
		return "Tutorial data added";
	}

	// This method is used to update tutorials to Database
	@CrossOrigin(origins = "http://localhost:4200")
	@PutMapping("/updateTutorials")
	public String updateTutorial(@Valid @RequestBody Tutorial tutorial, BindingResult result2, Model model) {
		if (result2.hasErrors()) {
			return "update-Tutorial";
		}
		tutorialRepository.save(tutorial);
		return "Tutorial data updated";
	}

	// This method is used to delete tutorial by id to Database
	@GetMapping("/deleteTutorialData/{id}")
	public String deleteTutorial(@PathVariable("id") int id, Model model) {
		Tutorial tutorial = tutorialRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Invalid Tutorial id: " + id));
		tutorialRepository.delete(tutorial);
		return "Tutorial data deleted";
	}
}
