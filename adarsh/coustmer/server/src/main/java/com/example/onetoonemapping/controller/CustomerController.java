package com.example.onetoonemapping.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.onetoonemapping.models.Customar;
import com.example.onetoonemapping.repository.CustomerRepository;

@RestController
@CrossOrigin
public class CustomerController {
	private Logger log = LoggerFactory.getLogger(CustomerController.class);

	@Autowired
	private CustomerRepository customerRepo;

	@GetMapping("/customers")
	public List<Customar> getCustomarList() {
		log.info("Start of CustomerController :: getCustomarList ");
		List<Customar> listOfCustomars = (List<Customar>) customerRepo.findAll();
		log.info("End of CustomerController :: getCustomarList ");
		return listOfCustomars;
	}
	@GetMapping("/customer/{id}")
	public Optional<Customar> getCustomerById(@PathVariable(value = "id") Integer customerId) {
		log.info("Start of CustomerController :: getCustomerById ");
		Optional<Customar> customer = customerRepo.findById(customerId);
		log.info("End of CustomerController :: getCustomerById ");
		return customer;
	}
	@PostMapping("/addCustomers")
	public Customar addNewustomer(@Valid @RequestBody Customar customar, BindingResult result, Model model) {
		log.info("Start of CustomerController :: addNewustomer ");
		return customerRepo.save(customar);

	}
	@PutMapping("/updatePanel")
	public Customar updateCustomer(@Valid @RequestBody Customar customar, BindingResult result, Model model) {
		log.info("Start of CustomerController :: updateCustomer ");
		return customerRepo.save(customar);
	}

}
