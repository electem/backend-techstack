package com.example.postgresdemo.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.postgresdemo.model.LoginUser;
import com.example.postgresdemo.service.LoginUserService;

@RestController
@CrossOrigin
public class LoginUserController {
	@Autowired
	private LoginUserService loginUserService;

	@PostMapping("/addloginuser")
	public LoginUser addUser(@Valid @RequestBody LoginUser user) {
		return loginUserService.addLoginUser(user);
	}

}