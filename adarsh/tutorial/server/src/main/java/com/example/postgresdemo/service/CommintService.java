package com.example.postgresdemo.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.postgresdemo.model.Comment;
import com.example.postgresdemo.repository.CommentRepository;

@Service
public class CommintService {

	@Autowired
	private CommentRepository commentRepo;

	public List<Comment> getCommentByTutorialId(@PathVariable(value = "id") Integer tutorialId) throws ParseException {
		final String TIME_FORMAT = "yyyy-MM-dd HH:mm:ss.SSSX";
		final SimpleDateFormat sdf = new SimpleDateFormat(TIME_FORMAT);
		final java.util.Date utilDate = sdf.parse("2022-09-09 12:29:27.164+05:30");
		
		List<Comment> commentList = commentRepo.findAllCommentsBasedOnTutorialId(tutorialId);
		  
		List<Comment> commentdate = commentList.stream()
		                        .peek( e -> e.setCreatDate(utilDate) )
		                        .collect(Collectors.toList());

		return commentdate;
	}

}
