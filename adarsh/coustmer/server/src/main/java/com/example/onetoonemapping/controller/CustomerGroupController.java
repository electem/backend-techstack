package com.example.onetoonemapping.controller;

import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.ModelAndView;
import com.example.onetoonemapping.models.CustomerGroup;
import com.example.onetoonemapping.models.Mail;
import com.example.onetoonemapping.repository.CustomerGroupRepository;
import com.example.onetoonemapping.service.MailService;

@Controller
@CrossOrigin
public class CustomerGroupController {

	private Logger log = LoggerFactory.getLogger(CustomerGroupController.class);

	@Value("${spring.mail.username}")
	private String userEmaile;

	ModelAndView hatmlData = new ModelAndView("greeting");

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
	public ModelAndView addNewustomerGroup(@Valid @RequestBody CustomerGroup customerGroup, BindingResult result,
			Model model) {
		ModelAndView hatmlData = new ModelAndView("greeting");
		log.info("Start of CustomerGroupController :: addNewustomerGroup ");
		String customerEmail = customerGroup.getCustomars().get(0).getName();
		List<Object[]> emaildata = CustomerGroupRepo.getCustomars(customerEmail);
		for (Object[] email : emaildata) {
			hatmlData.addObject("id", email[0]);
			hatmlData.addObject("email", email[1]);
			hatmlData.addObject("data1", email[2]);
			hatmlData.addObject("data2", email[3]);
			hatmlData.addObject("data3", email[4]);
			hatmlData.addObject("data4", email[5]);
			Mail mail = new Mail();
			mail.setMailFrom(userEmaile);
			mail.setMailTo(email[1].toString());
			mail.setMailContent("MAIL IS SANT SUCCESFULLY");
			mail.setMailSubject("texting");
			 mailService.sendEmail(mail);
		}
		return hatmlData;

	}

	@PutMapping("/updateCustomerGroup")
	public CustomerGroup updateCustomerGroup(@Valid @RequestBody CustomerGroup CustomerGroup, BindingResult result,
			Model model) {
		log.info("Start of CustomerGroupController :: updateCustomerGroup ");
		return CustomerGroupRepo.save(CustomerGroup);
	}

	private static final String appName = "Welcome to java";

	@GetMapping("/greeting")
	public String greeting(Model model) {
		model.addAttribute("name", "shiva");
		model.addAttribute("title", appName);
		System.out.println(model);
		return "greeting";
	}
}
