package com.example.onetoonemapping.controller;

import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.onetoonemapping.models.Customer;
import com.example.onetoonemapping.repository.CustomerRepository;

@RestController
@CrossOrigin
public class CustomerController {

	/**
	 * Logger
	 */
	private static final Logger LOG = LoggerFactory.getLogger(CustomerController.class);

	@Autowired
	CustomerRepository customerRepository;

	// This block of code is used to save a customer to the DB.
	@PostMapping("/createCustomer")
	public Customer createCustomer(@Valid @RequestBody Customer customer) {
		LOG.info("Start of CustomerController :: createCustomer ");
		return customerRepository.save(customer);
	}
}