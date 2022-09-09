package com.example.postgresdemo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.postgresdemo.model.LoginUser;
import com.example.postgresdemo.repository.LoginUserRepository;

@Service
public class LoginUserService {

	@Autowired
	private LoginUserRepository loginUserRepository;
	
	public LoginUser addLoginUser(LoginUser user){
		return loginUserRepository.save(user);
	}

}