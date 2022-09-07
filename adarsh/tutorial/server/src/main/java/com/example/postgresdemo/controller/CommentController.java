package com.example.postgresdemo.controller;

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
import com.example.postgresdemo.service.CommintService;

//this is the controller class
@RestController
@CrossOrigin
public class CommentController {
	// repository class of comment model
	@Autowired
	private CommentRepository commentRepo;
	
	@Autowired
	private CommintService commintService;

	

	// this method will get the comments based on the tutorial id
	@GetMapping("/coments/{id}")
	   public List<Comment> getCommentByTutorialId(@PathVariable(value = "id") Integer tutorialId) {
        List<Comment> comments = commintService.getCommentByTutorialId(tutorialId);
        return comments;
    }

	

	// this method will post the comments
	@PostMapping("/addComment")
	public String addComment(@Valid @RequestBody Comment comment, BindingResult result, Model model) {
		if (result.hasErrors()) {
			return "comment";
		}
		commentRepo.save(comment);
		return "Comment data added";
	}

}
