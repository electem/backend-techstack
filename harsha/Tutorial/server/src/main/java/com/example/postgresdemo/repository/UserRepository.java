package com.example.postgresdemo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.postgresdemo.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

  @Query(value ="SELECT u.* FROM users u join comments c on u.id=c.user_id join tutorials t on t.id=c.tutorial_id"
		+ " GROUP BY u.id  HAVING COUNT(*) >=1 ", nativeQuery = true)
	List<User> findAll();
}
