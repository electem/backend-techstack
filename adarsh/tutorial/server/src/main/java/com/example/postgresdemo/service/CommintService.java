package com.example.postgresdemo.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.postgresdemo.model.Comment;
import com.example.postgresdemo.repository.CommentRepository;

@Service
public class CommintService {
	

	private CommentRepository commentRepo;
	

	// Constructor for controller class
	@Autowired
	public CommintService(CommentRepository commentRepo) {
		this.commentRepo = commentRepo;
	}
	
	public List<Comment> getCommentByTutorialId(@PathVariable(value = "id") Integer tutorialId) {
        List<Comment> commentList = commentRepo.findAllCommentsBasedOnTutorialId(tutorialId);
        return commentList;
    }
		
	}



