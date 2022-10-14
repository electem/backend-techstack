package com.example.onetoonemapping.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.example.onetoonemapping.controller.UserController;
import com.example.onetoonemapping.models.User;

@Service
public class AppUserDetailsService implements UserDetailsService {

	@Autowired
	UserController userController;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userController.find(username);
		return user;
	}
}
