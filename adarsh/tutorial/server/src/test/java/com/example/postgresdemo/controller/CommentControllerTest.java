package com.example.postgresdemo.controller;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import org.junit.Test;
import org.junit.runner.RunWith;
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
    public void addComment() {
        Comment comment = new Comment("comment1", 1);
        when(commentRepository.save(comment)).thenReturn(comment);
        assertEquals(comment, commentRepository.save(comment));
    }
}