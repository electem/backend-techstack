package com.example.postgresdemo.controller;

import java.security.Principal;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.postgresdemo.model.CustomErrorType;
import com.example.postgresdemo.model.Users;
import com.example.postgresdemo.service.UsersService;

@RestController
@CrossOrigin
public class UsersController {

	@Autowired
	private UsersService usersService;

	public static final Logger logger = LoggerFactory.getLogger(UsersController.class);

	@PostMapping("/adduser")
	public Users addUser(@Valid @RequestBody Users users) {
		return usersService.save(users);
	}

	@CrossOrigin
	@PostMapping("/register")
	public ResponseEntity<Users> createUser(@RequestBody Users newUser) {
		if (usersService.find(newUser.getUserName()) != null) {
			logger.error("username Already exist " + newUser.getUserName());
			return new ResponseEntity(
					new CustomErrorType("user with username " + newUser.getUserName() + "already exist "),
					HttpStatus.CONFLICT);
		}
		newUser.setRole("USER");

		return new ResponseEntity<Users>(usersService.save(newUser), HttpStatus.CREATED);
	}

	// this is the login api/service
	@CrossOrigin
	@RequestMapping("/login")
	public Principal user(Principal principal) {
		logger.info("user logged " + principal);
		return principal;
	}
}
