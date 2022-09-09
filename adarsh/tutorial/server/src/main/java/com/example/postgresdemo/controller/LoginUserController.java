package com.example.postgresdemo.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.postgresdemo.model.LoginUser;
import com.example.postgresdemo.model.User;
import com.example.postgresdemo.repository.LoginUserRepository;
import com.example.postgresdemo.repository.UserRepository;



@RestController
public class LoginUserController {
	@Autowired
	private LoginUserRepository loginUserRepository;

	@GetMapping("/loginuser")
	public List<LoginUser> getUsers() {
		return (List<LoginUser>) this.loginUserRepository.findAll();
	}

	@PostMapping("/addloginuser")
	public LoginUser addUser(@Valid @RequestBody LoginUser user) {
		return loginUserRepository.save(user);
	}

}