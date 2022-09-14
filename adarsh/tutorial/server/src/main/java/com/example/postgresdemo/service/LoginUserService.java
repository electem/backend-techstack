package com.example.postgresdemo.service;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.postgresdemo.model.LoginUser;
import com.example.postgresdemo.repository.LoginUserRepository;

@Service
public class LoginUserService {
	@Autowired
	LoginUserRepository loginUserRepository;

	public LoginUser addLoginUser(@Valid LoginUser user) {
		return loginUserRepository.save(user);
	}
	public LoginUser find(String userName) {
		return loginUserRepository.findOneByUsername(userName);
	}
	
}
