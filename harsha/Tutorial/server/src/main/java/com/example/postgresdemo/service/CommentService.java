package com.example.postgresdemo.service;

import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.postgresdemo.model.Comment;
import com.example.postgresdemo.repository.CommentRepository;

@RestController
@CrossOrigin
public class CommentService {

	private final CommentRepository commentRepository;

	@Autowired
	public CommentService(CommentRepository commentRepository) {
		this.commentRepository = commentRepository;
	}

	public List<Comment> getCommentByTutorialId(@PathVariable(value = "id") Integer tutorialId) {
		List<Comment> commentList = commentRepository.findByTutorialId(tutorialId);
		return commentList;
	}

	public Comment createComment(Comment comment) {
		
		return commentRepository.save(comment);
	}
}


