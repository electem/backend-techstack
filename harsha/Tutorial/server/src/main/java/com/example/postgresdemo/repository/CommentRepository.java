package com.example.postgresdemo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.postgresdemo.model.Comment;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Integer> {

	@Query(value = "SELECT * FROM comments c where c.tutorial_id=?1", nativeQuery = true)
	List<Comment> findByTutorialId(Integer tutorialId);
}
