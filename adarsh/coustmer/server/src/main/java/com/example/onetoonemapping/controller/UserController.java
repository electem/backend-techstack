package com.example.onetoonemapping.controller;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.onetoonemapping.models.User;
import com.example.onetoonemapping.repository.UserRepository;

@RestController
@CrossOrigin
public class UserController {
	
	private Logger log = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserRepository userRepo;
	
	@GetMapping("/Users")
	public List<User> getUSerList() {
		log.info("Start of UserController :: getUSerList ");
		List<User> listOfUsers = (List<User>) userRepo.findAll();
		log.info("End of PanelController :: getPanelList ");
		return listOfUsers;
	}

	@PostMapping("/addUser")
	public User addNewUser(@Valid @RequestBody User user, BindingResult result, Model model) {
		log.info("Start of UserController :: addNewUser ");
		return userRepo.save(user);

	}

}
