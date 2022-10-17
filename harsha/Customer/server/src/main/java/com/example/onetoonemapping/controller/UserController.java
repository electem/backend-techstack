package com.example.onetoonemapping.controller;

import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.onetoonemapping.models.User;
import com.example.onetoonemapping.service.UserService;

@RestController
@CrossOrigin
public class UserController {

	/**
	 * Logger
	 */
	private static final Logger LOG = LoggerFactory.getLogger(UserController.class);

	@Autowired
	UserService userService;

	// This block of code is used to save a user to the DB.
	@PostMapping("/createUser")
	public User createUser(@Valid @RequestBody User user) {
		LOG.info("Start of UserController :: createUser ");
		return userService.createUser(user);
	}
}