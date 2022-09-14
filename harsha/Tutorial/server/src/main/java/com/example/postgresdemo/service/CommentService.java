package com.example.postgresdemo.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.postgresdemo.model.Comment;
import com.example.postgresdemo.repository.CommentRepository;

@Service
public class CommentService {
	
	@Autowired
	CommentRepository commentRepository;

	public List<Comment> getCommentByTutorialId(@PathVariable(value = "id") Integer tutorialId) throws ParseException {
		final SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSSX");
		final Date date = formatter.parse("2022-09-07 10:15:03.244+05:30");
		List<Comment> commentList = commentRepository.findByTutorialId(tutorialId);

		return commentList;
	}

	public Comment createComment(Comment comment) {
		return commentRepository.save(comment);
	}
}
