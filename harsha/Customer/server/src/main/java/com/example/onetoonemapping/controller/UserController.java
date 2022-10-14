package com.example.onetoonemapping.controller;

import java.security.Principal;
import java.util.List;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.onetoonemapping.models.User;
import com.example.onetoonemapping.repository.UserRepository;

@RestController
@CrossOrigin
@RequestMapping("/account")
public class UserController {

	/**
	 * Logger
	 */
	private static final Logger LOG = LoggerFactory.getLogger(UserController.class);

	@Autowired
	UserRepository userRepository;

	// This block of code is used to save a user to the DB.
	@PostMapping("/createUser")
	public User createUser(@Valid @RequestBody User user) {
		LOG.info("Start of UserController :: createUser ");
		return userRepository.save(user);
	}

	// This block of code is used to get a users list from the DB.
	@GetMapping("/users")
	public List<User> getUserList() {
		LOG.info("Start of UserController :: getUserList ");
		List<User> users = (List<User>) userRepository.findAll();
		LOG.info("End of UserController :: getUserList ");
		return users;
	}

	@RequestMapping("/login")
	public Principal user(Principal principal) {
		return principal;
	}

	public User find(String userName) {
		return userRepository.findOneByUsername(userName);
	}
}