package com.example.postgresdemo.controller;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.postgresdemo.model.Users;
import com.example.postgresdemo.service.UsersService;

@RestController
@CrossOrigin
public class UsersController {

	@Autowired
	private  UsersService usersService;

	public UsersController(UsersService usersService) {
		this.usersService = usersService;
	}

	@PostMapping("/adduser")
	public Users addUser(@Valid @RequestBody Users users) {
		return usersService.addUser(users);
	}
}
