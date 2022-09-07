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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.postgresdemo.exception.ResourceNotFoundException;
import com.example.postgresdemo.model.Category;
import com.example.postgresdemo.repository.CategoryRepository;

@RestController
@CrossOrigin
public class CategoryController {

	private final CategoryRepository categoryRepository;

	@Autowired
	public CategoryController(CategoryRepository categoryRepository) {
		this.categoryRepository = categoryRepository;
	}

	// This method is used to get components data from the Database.
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/categories")
	public List<Category> getCategoryData() {
		return (List<Category>) this.categoryRepository.findAll();
	}

	@GetMapping("/categories/{id}")
	public ResponseEntity<Category> getTutorialById(@PathVariable(value = "id") Integer instructorId)
			throws ResourceNotFoundException {
		Category category = categoryRepository.findById(instructorId)
				.orElseThrow(() -> new ResourceNotFoundException("Tutorial not found :: " + instructorId));
		return ResponseEntity.ok().body(category);
	}

	// This method is used to add component to Database
	@PostMapping("/addCategory")
	public String addCategory(@Valid @RequestBody Category category, BindingResult result2, Model model) {
		if (result2.hasErrors()) {
			return "addCategory";
		}
		categoryRepository.save(category);
		return "Category data added";
	}
}
