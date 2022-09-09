package com.example.postgresdemo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import com.example.postgresdemo.model.Users;
import com.example.postgresdemo.repository.UsersRepository;

@RestController
public class UsersService {

	@Autowired
	private  UsersRepository usersRepository;

    public Users addUser(Users users) {
        return usersRepository.save(users);
    }
}
