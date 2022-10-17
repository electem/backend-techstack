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
import com.example.onetoonemapping.models.CustomerGroup;
import com.example.onetoonemapping.repository.CustomerGroupRepository;

@RestController
@CrossOrigin
public class CustomerGroupController {
	
	private Logger log = LoggerFactory.getLogger(CustomerGroupController.class);
	
	@Autowired
	private CustomerGroupRepository CustomerGroupRepo;
	
	@GetMapping("/customerGroup")
	public List<CustomerGroup> getCustomarGroupList() {
		log.info("Start of CustomerGroupController :: getCustomarGroupList ");
		List<CustomerGroup> listOfCustomarGroups = (List<CustomerGroup>) CustomerGroupRepo.findAll();
		log.info("End of CustomerGroupController :: getCustomarGroupList ");
		return listOfCustomarGroups;
	}
	@PostMapping("/addCustomerGroup")
	public CustomerGroup addNewustomerGroup(@Valid @RequestBody CustomerGroup customerGroup, BindingResult result, Model model) {
		log.info("Start of CustomerGroupController :: addNewustomerGroup ");
		return CustomerGroupRepo.save(customerGroup);
	}
}
	