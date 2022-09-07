package com.example.postgresdemo.controller;

import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.postgresdemo.model.Comment;
import com.example.postgresdemo.service.CommentService;

@RestController
@CrossOrigin
public class CommentController {

	private final CommentService commentService;

	@Autowired
	public CommentController(CommentService commentService) {
		this.commentService = commentService;
	}

	@GetMapping("comments/tutorials/{id}")
	public List<Comment> getCommentByTutorialId(@PathVariable(value = "id") Integer tutorialId) {
		List<Comment> comments = commentService.getCommentByTutorialId(tutorialId);
		return comments;
	}

	@PostMapping("/createComment")
	public String createComment(@Valid @RequestBody Comment comment) {
		commentService.createComment(comment);

		return "Comment data added";
	}
}
