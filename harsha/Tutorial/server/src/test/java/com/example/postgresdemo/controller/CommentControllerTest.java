package com.example.postgresdemo.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.example.postgresdemo.model.Comment;
import com.example.postgresdemo.repository.CommentRepository;

@SpringBootTest
class CommentControllerTest {

	@MockBean
	CommentRepository commentRepository;

	@Test
	public void addComment() throws ParseException {
		Comment comment = new Comment("comment1", 1,
				new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSSX").parse("2022-09-06 19:18:00.296+05:30"));
		when(commentRepository.save(comment)).thenReturn(comment);
		assertEquals(comment, commentRepository.save(comment));
	}
	
	@Test
	public void getCommentByTutorialId() throws ParseException {
		int id = 1;
		List<Comment> comments = new ArrayList<Comment>();
		Comment comment = new Comment("good", 1,
				new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSSX").parse("2022-09-06 19:18:00.296+05:30"));
		Comment comment1 = new Comment("bad", 1,
				new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSSX").parse("2022-09-06 19:24:14.58+05:30"));
		comments.add(comment);
		comments.add(comment1);
		Mockito.when(commentRepository.findByTutorialId(id)).thenReturn(comments);
		assertEquals(comments.size(), (commentRepository.findByTutorialId(id)).size());
	}
}
