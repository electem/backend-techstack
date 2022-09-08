package com.example.postgresdemo.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.postgresdemo.exception.ResourceNotFoundException;
import com.example.postgresdemo.model.Question;
import com.example.postgresdemo.repository.QuestionRepository;

@RestController
public class QuestionController {

	@Autowired
	private QuestionRepository questionRepository;

	@PostMapping("/addQuestions")
	public Question createQuestion(@Valid @RequestBody Question question) {
		return questionRepository.save(question);
	}

	// This method is to update question data into database.
	@PutMapping("/updatequestions/{questionId}")
	public Question updateQuestion(@PathVariable Long questionId, @Valid @RequestBody Question questionRequest) {
		return questionRepository.findById(questionId).map(question -> {
			question.setTitle(questionRequest.getTitle());
			question.setDescription(questionRequest.getDescription());
			return questionRepository.save(question);
		}).orElseThrow(() -> new ResourceNotFoundException("Question not found with id " + questionId));
	}

	// This method is used to delete question data from database.
	@DeleteMapping("/questions/{questionId}")
	public ResponseEntity<?> deleteQuestion(@PathVariable Long questionId) {
		return questionRepository.findById(questionId).map(question -> {
			questionRepository.delete(question);
			return ResponseEntity.ok().build();
		}).orElseThrow(() -> new ResourceNotFoundException("Question not found with id " + questionId));
	}
}
