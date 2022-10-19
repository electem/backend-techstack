package com.example.onetoonemapping.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
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
import com.example.onetoonemapping.models.CustomerGroup;
import com.example.onetoonemapping.models.Mail;
import com.example.onetoonemapping.repository.CustomerGroupRepository;
import com.example.onetoonemapping.service.MailService;

@RestController
@CrossOrigin
public class CustomerGroupController {

	private Logger log = LoggerFactory.getLogger(CustomerGroupController.class);

	@Autowired
	private CustomerGroupRepository CustomerGroupRepo;
	
	@Autowired
	private MailService mailService;

	@GetMapping("/customerGroup")
	public List<CustomerGroup> getCustomarGroupList() {
		log.info("Start of CustomerGroupController :: getCustomarGroupList ");
		List<CustomerGroup> listOfCustomarGroups = (List<CustomerGroup>) CustomerGroupRepo.findAll();
		log.info("End of CustomerGroupController :: getCustomarGroupList ");
		return listOfCustomarGroups;
	}

	@GetMapping("/customerGroup/{id}")
	public Optional<CustomerGroup> getCustomerGroupById(@PathVariable(value = "id") Integer customerGroupId) {
		log.info("Start of CustomerGroupController :: getCustomerGroupById ");
		Optional<CustomerGroup> customer = CustomerGroupRepo.findById(customerGroupId);
		log.info("End of CustomerGroupController :: getCustomerGroupById ");
		return customer;
	}

	@PostMapping("/addCustomerGroup")
	public void addNewustomerGroup(@Valid @RequestBody CustomerGroup customerGroup, BindingResult result, Model model) {
		log.info("Start of CustomerGroupController :: addNewustomerGroup ");
			String customerEmail=customerGroup.getCustomars().get(0).getName();
			List<Object[]> emaildata = CustomerGroupRepo.getCustomars(customerEmail);
			for(Object[] email:emaildata){
				Mail mail = new Mail();
				mail.setMailFrom("adarsh@electems.com");
				mail.setMailTo(email[1].toString());
				mail.setMailSubject("Spring Boot - Email demo");
				mail.setMailContent("Just");
				mailService.sendEmail(mail);
			}
	}

	@PutMapping("/updateCustomerGroup")
	public CustomerGroup updateCustomerGroup(@Valid @RequestBody CustomerGroup CustomerGroup, BindingResult result,
			Model model) {
		log.info("Start of CustomerGroupController :: updateCustomerGroup ");
		return CustomerGroupRepo.save(CustomerGroup);
	}
}
