package com.example.onetoonemapping.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.onetoonemapping.models.User;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

	User findOneByUsername(String username);
}