package com.example.onetoonemapping.controller;

import java.util.List;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.onetoonemapping.exceptions.ResourceNotFoundException;
import com.example.onetoonemapping.models.Customer;
import com.example.onetoonemapping.models.CustomerGroup;
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

	// This block of code is used to get a customers list from the DB.
	@GetMapping("/customers")
	public List<Customer> getCustomers() {
		LOG.info("Start of CustomerController :: getCustomers ");
		List<Customer> customers = (List<Customer>) customerRepository.findAll();
		LOG.info("End of CustomerController :: getCustomers ");
		return customers;
	}

	// This block of code is used to get a customer by customerId from DB.
	@GetMapping("/customer/{id}")
	public ResponseEntity<Customer> getCustomerById(@PathVariable(value = "id") Integer id)
			throws ResourceNotFoundException {
		LOG.info("Start of CustomerController :: getCustomerById ");
		Customer customer = customerRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Customer not found :: " + id));
		LOG.info("Start of CustomerController :: getCustomerById ");
		return ResponseEntity.ok().body(customer);
	}
}