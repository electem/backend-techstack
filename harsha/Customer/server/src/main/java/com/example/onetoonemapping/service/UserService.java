package com.example.onetoonemapping.service;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.onetoonemapping.models.User;
import com.example.onetoonemapping.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository userRepository;

	public User createUser(@Valid @RequestBody User user) {
		return userRepository.save(user);
	}
}