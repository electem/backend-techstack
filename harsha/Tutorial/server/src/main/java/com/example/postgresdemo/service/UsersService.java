package com.example.postgresdemo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.postgresdemo.model.Users;
import com.example.postgresdemo.repository.UsersRepository;

@Service
public class UsersService {

	@Autowired
	private  UsersRepository usersRepository;

    public Users save(Users user) {
		return usersRepository.save(user);
	}
    
    public Users find(String userName) {
		return usersRepository.findOneByUsername(userName);
	}
}
