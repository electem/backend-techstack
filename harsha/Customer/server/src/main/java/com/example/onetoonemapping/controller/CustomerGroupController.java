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

	// This block of code is used to get a customerGroups list from the DB.
	@GetMapping("/customerGroups")
	public List<CustomerGroup> getCustomerGroupList() {
		LOG.info("Start of CustomerGroupController :: getCustomerGroupList ");
		List<CustomerGroup> customerGroups = (List<CustomerGroup>) customerGroupRepository.findAll();
		LOG.info("End of CustomerGroupController :: getCustomerGroupList ");
		return customerGroups;
	}

	// This block of code is used to get a customerGroup by customerGroupId from DB.
	@GetMapping("/customerGroup/{id}")
	public ResponseEntity<CustomerGroup> getCustomerGroupById(@PathVariable(value = "id") Integer id)
			throws ResourceNotFoundException {
		LOG.info("Start of CustomerGroupController :: getCustomerGroupById ");
		CustomerGroup customerGroup = customerGroupRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("CustomerGroup not found :: " + id));
		LOG.info("Start of CustomerGroupController :: getCustomerGroupById ");
		return ResponseEntity.ok().body(customerGroup);
	}
}