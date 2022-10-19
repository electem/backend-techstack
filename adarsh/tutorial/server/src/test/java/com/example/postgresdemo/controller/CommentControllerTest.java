package com.example.postgresdemo.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import com.example.postgresdemo.model.Comment;
import com.example.postgresdemo.repository.CommentRepository;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CommentControllerTest {

	@MockBean
	CommentRepository commentRepository;

	@Test
	public void addComment() throws ParseException {
		final String TIME_FORMAT = "yyyy-MM-dd HH:mm:ss.SSSX";
		final SimpleDateFormat sdf = new SimpleDateFormat(TIME_FORMAT);
		final java.util.Date utilDate = sdf.parse("2022-09-09 13:54:12.602+04:30");
		Comment comment = new Comment();
		comment.setId(1);
		comment.setCommentDescription("comment1");
		comment.setCreatDate(utilDate);
		comment.setTutorial_id(1);
		when(commentRepository.save(comment)).thenReturn(comment);
		assertEquals(comment, commentRepository.save(comment));
	}

	@Test
	public void getCommentByTutorialId() throws ParseException {
		int id = 1;
		final String TIME_FORMAT = "yyyy-MM-dd HH:mm:ss.SSSX";
		final SimpleDateFormat sdf = new SimpleDateFormat(TIME_FORMAT);
		final java.util.Date utilDate = sdf.parse("2022-09-09 12:29:27.164+05:30");
		

		final String TIME_FORMAT1 = "yyyy-MM-dd HH:mm:ss.SSSX";
		final SimpleDateFormat sdf1 = new SimpleDateFormat(TIME_FORMAT1);
		final java.util.Date utilDate1 = sdf1.parse("2022-09-09 12:27:08.839+05:30");

		Comment comment = new Comment();
		comment.setId(1);
		comment.setCommentDescription("comment1");
		comment.setCreatDate(utilDate);
		comment.setTutorial_id(1);

		Comment comment1 = new Comment();
		comment1.setId(1);
		comment1.setCommentDescription("comment1");
		comment1.setCreatDate(utilDate1);
		comment1.setTutorial_id(1);
		List<Comment> comments = new ArrayList<Comment>();
		comments.add(comment);
		comments.add(comment1);

		Mockito.when(commentRepository.findAllCommentsBasedOnTutorialId(id)).thenReturn(comments);
		assertEquals(comments.size(), (commentRepository.findAllCommentsBasedOnTutorialId(id)).size());
	}
}