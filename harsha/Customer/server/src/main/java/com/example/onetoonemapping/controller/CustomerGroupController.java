package com.example.onetoonemapping.controller;

import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.onetoonemapping.models.CustomerGroup;
import com.example.onetoonemapping.repository.CustomerGroupRepository;

@RestController
@CrossOrigin
public class CustomerGroupController {

	/**
	 * Logger
	 */
	private static final Logger LOG = LoggerFactory.getLogger(CustomerGroupController.class);

	@Autowired
	CustomerGroupRepository customerGroupRepository;

	// This block of code is used to save a customerGroup to the DB.
	@PostMapping("/createCustomerGroup")
	public CustomerGroup createCustomerGroup(@Valid @RequestBody CustomerGroup customerGroup) {
		LOG.info("Start of CustomerGroupController :: createCustomerGroup ");
		return customerGroupRepository.save(customerGroup);
	}
}