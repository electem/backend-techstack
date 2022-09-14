package com.example.postgresdemo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.postgresdemo.model.LoginUser;

@Repository
public interface LoginUserRepository extends CrudRepository<LoginUser, Long> {
	public LoginUser findOneByUsername(String userName);

}
