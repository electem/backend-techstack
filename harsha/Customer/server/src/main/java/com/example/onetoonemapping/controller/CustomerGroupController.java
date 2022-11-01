package com.example.onetoonemapping.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.validation.Valid;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.example.onetoonemapping.exceptions.ResourceNotFoundException;
import com.example.onetoonemapping.models.Customer;
import com.example.onetoonemapping.models.CustomerGroup;
import com.example.onetoonemapping.models.Mail;
import com.example.onetoonemapping.repository.CustomerGroupRepository;
import com.example.onetoonemapping.service.CustomerGroupService;
import com.example.onetoonemapping.service.MailService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@CrossOrigin
public class CustomerGroupController {
	/**
	 * Logger
	 */
	private static final Logger LOG = LoggerFactory.getLogger(CustomerGroupController.class);

	@Value("${usermail}")
	private String userEmail;

	@Autowired
	CustomerGroupRepository customerGroupRepository;

	@Autowired
	CustomerGroupService customerGroupService;

	@Autowired
	private MailService mailService;

	// This block of code is used to save a customerGroup to the DB.
	@PostMapping("/createCustomerGroup")
	public ModelAndView createCustomerGroup(@Valid @RequestBody CustomerGroup customerGroup) {
		LOG.info("Start of CustomerGroupController :: createCustomerGroup ");
		ModelAndView mav = customerGroupService.createCustomerGroup(customerGroup);
		return mav;
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
		LOG.info("End of CustomerGroupController :: getCustomerGroupById ");
		return ResponseEntity.ok().body(customerGroup);
	}

	// This block of code is used to update a customer to the DB.
	@PutMapping("/updateCustomerGroup/{id}")
	public CustomerGroup updateCustomerGroup(@PathVariable("id") int id,
			@Valid @RequestBody CustomerGroup customerGroup) {
		LOG.info("Start of CustomerGroupController :: updateCustomerGroup ");
		return customerGroupRepository.save(customerGroup);
	}

	@GetMapping("/deleteCustomerGroupData/{id}")
	public String deleteTutorial(@PathVariable("id") int id) {
		CustomerGroup customerGroup = customerGroupRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Invalid CustomerGroup id: " + id));
		customerGroupRepository.delete(customerGroup);
		return "CustomerGroup data deleted";
	}

	@GetMapping("/email")
	public void test() throws IOException {
		HttpPost post = new HttpPost("http://localhost:8080/createCustomerGroup");
		post.setHeader("Accept", "application/json, application/json");
		post.setHeader("Content-Type", "application/json;charset=UTF-8");
		Customer customer1 = Customer.builder().name("harsha@electems.com").build();
		Customer customer2 = Customer.builder().name("adarsh@electems.com").build();
		List<Customer> customers = new ArrayList<>();
		customers.add(customer1);
		customers.add(customer2);
		CustomerGroup customerGroup1 = CustomerGroup.builder().customers(customers).build();
		// Creating Object of ObjectMapper define in Jackson API
		ObjectMapper objectMapper = new ObjectMapper();
		String json = null;
		json = objectMapper.writeValueAsString(customerGroup1);
		post.setEntity(new StringEntity(json.toString()));
		try (CloseableHttpClient httpClient = HttpClients.createDefault();
				CloseableHttpResponse response = httpClient.execute(post)) {
			String htmlDataBinded = EntityUtils.toString(response.getEntity());
			customerGroupService.htmlToPdfAndToSendMail(htmlDataBinded, "index");
		}
	}
}