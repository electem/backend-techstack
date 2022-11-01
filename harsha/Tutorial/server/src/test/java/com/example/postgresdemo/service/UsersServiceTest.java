package com.example.postgresdemo.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import com.example.postgresdemo.model.Users;
import com.example.postgresdemo.repository.UsersRepository;

class UsersServiceTest {

	@MockBean
	UsersRepository usersRepository;
	
	@Test
	public void addUser() {
		Users users = new Users(1,"harsha","password","author");
		when(usersRepository.save(users)).thenReturn(users);
		assertEquals(users, usersRepository.save(users));
	}
}
