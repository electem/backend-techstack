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
import com.example.onetoonemapping.models.Customar;
import com.example.onetoonemapping.repository.CustomerRepository;

@RestController
@CrossOrigin
public class CustomerController {
	private Logger log = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private CustomerRepository customerRepo;

	@GetMapping("/customers")
	public List<Customar> getCustomarList() {
		log.info("Start of CustomerController :: getCustomarList ");
		List<Customar> listOfCustomars = (List<Customar>) customerRepo.findAll();
		log.info("End of PanelController :: getPanelList ");
		return listOfCustomars;
	}
	
	@PostMapping("/addCustomersr")
	public Customar addNewustomer(@Valid @RequestBody Customar customar, BindingResult result, Model model) {
		log.info("Start of CustomerController :: addNewustomer ");
		return customerRepo.save(customar);

	}

}
