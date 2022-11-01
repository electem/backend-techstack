package com.example.postgresdemo.controller;

import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import com.example.postgresdemo.repository.LoginUserRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class LoginUserServiceTest {
	
	@MockBean
	LoginUserRepository loginUserRepository;
	
	
	
}
