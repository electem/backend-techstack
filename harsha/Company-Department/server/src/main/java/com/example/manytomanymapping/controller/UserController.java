package com.example.manytomanymapping.controller;

import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.manytomanymapping.models.CustomErrorType;
import com.example.manytomanymapping.models.User;
import com.example.manytomanymapping.repository.UserRepository;

@RestController
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	PasswordEncoder encoder;

	public static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@PostMapping("/register")
	public ResponseEntity<?> createUser(@Valid @RequestBody User user) {
		if (userRepository.existsByUsername(user.getUsername())) {
			return ResponseEntity.badRequest().body(new CustomErrorType("Error: Username is already taken!"));
		}
		user.setPassword(encoder.encode(user.getPassword()));
		return new ResponseEntity<User>(userRepository.save(user), HttpStatus.CREATED);
	}
}