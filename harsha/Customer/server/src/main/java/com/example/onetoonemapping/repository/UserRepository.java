package com.example.onetoonemapping.repository;

import org.springframework.data.repository.CrudRepository;

import com.example.onetoonemapping.models.User;

public interface UserRepository extends CrudRepository<User, Integer>{
 
	public User findOneByUsername(String userName);
}
