package com.example.postgresdemo.controller;

import com.example.postgresdemo.exception.ResourceNotFoundException;
import com.example.postgresdemo.model.Answer;
import com.example.postgresdemo.repository.AnswerRepository;
import com.example.postgresdemo.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@RestController
public class AnswerController {

	@Autowired
	private AnswerRepository answerRepository;

	@Autowired
	private QuestionRepository questionRepository;

	// This method is used to get answer data from the database.
	@GetMapping("/questions/answers")
	public List<Answer> getAnswers() {
		return answerRepository.findAll();
	}

	// This method is used to add answer data into database using questionId.
	@PostMapping("/questions/{questionId}/answers")
	public Answer addAnswer(@PathVariable Long questionId, @Valid @RequestBody Answer answer) {
		return questionRepository.findById(questionId).map(question -> {
			answer.setQuestion(question);
			return answerRepository.save(answer);
		}).orElseThrow(() -> new ResourceNotFoundException("Question not found with id " + questionId));
	}

	// This method is used to update answer data using questionId and answerId into
	// the database.
	@PutMapping("/questions/{questionId}/answers/{answerId}")
	public Answer updateAnswer(@PathVariable Long questionId, @PathVariable Long answerId,
			@Valid @RequestBody Answer answerRequest) {
		if (!questionRepository.existsById(questionId)) {
			throw new ResourceNotFoundException("Question not found with id " + questionId);
		}
		return answerRepository.findById(answerId).map(answer -> {
			answer.setText(answerRequest.getText());
			return answerRepository.save(answer);
		}).orElseThrow(() -> new ResourceNotFoundException("Answer not found with id " + answerId));
	}

	// This method is used to delete answer data using questionId and answerId from
	// the database.
	@DeleteMapping("/questions/{questionId}/answers/{answerId}")
	public ResponseEntity<?> deleteAnswer(@PathVariable Long questionId, @PathVariable Long answerId) {
		if (!questionRepository.existsById(questionId)) {
			throw new ResourceNotFoundException("Question not found with id " + questionId);
		}
		return answerRepository.findById(answerId).map(answer -> {
			answerRepository.delete(answer);
			return ResponseEntity.ok().build();
		}).orElseThrow(() -> new ResourceNotFoundException("Answer not found with id " + answerId));
	}
}
