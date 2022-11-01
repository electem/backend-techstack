package com.example.postgresdemo.controller;

import java.util.List;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.postgresdemo.model.User;
import com.example.postgresdemo.repository.UserRepository;

@RestController
public class UserController {
	@Autowired
	private UserRepository userRepository;

	@GetMapping("/users")
	public List<User> getUsers() {
		return (List<User>) this.userRepository.findAll();
	}

	@PostMapping("/addUser")
	public User addUser(@Valid @RequestBody User user) {
		return userRepository.save(user);
	}

}
