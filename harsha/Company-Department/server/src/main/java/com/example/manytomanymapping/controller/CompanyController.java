package com.example.manytomanymapping.controller;

import java.util.List;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.manytomanymapping.models.Company;
import com.example.manytomanymapping.repository.CompanyRepository;

@RestController
@CrossOrigin
public class CompanyController {

	/**
	 * Logger
	 */
	private static final Logger LOG = LoggerFactory.getLogger(CompanyController.class);

	@Autowired
	CompanyRepository companyRepository;

	// This block of code is used to save a company to the DB.
	@PostMapping("/createCompany")
	public Company createCompany(@Valid @RequestBody Company company) {
		LOG.info("Start of CompanyController :: createCompany");
		return companyRepository.save(company);
	}

	// This block of code is used to get companies list from DB.
	@GetMapping("/companies")
	public List<Company> getCompaniesList() {
		LOG.info("Start of CompanyController :: getCompaniesList ");
		List<Company> companies = (List<Company>) companyRepository.findAll();
		LOG.info("End of CompanyController :: getCompaniesList ");
		return companies;
	}
}