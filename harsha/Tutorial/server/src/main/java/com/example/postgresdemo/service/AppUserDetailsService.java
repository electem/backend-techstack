//package com.example.postgresdemo.service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import com.example.postgresdemo.model.Users;
//
//@Service
//public class AppUserDetailsService implements UserDetailsService {
//
//	@Autowired
//	UsersService usersService;
//
//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		Users user = usersService.find(username);
//		return user;
//	}
//}
