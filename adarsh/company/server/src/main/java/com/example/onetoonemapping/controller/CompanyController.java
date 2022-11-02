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
import com.example.onetoonemapping.models.Company;
import com.example.onetoonemapping.repository.CompanyRepository;

@RestController
@CrossOrigin
public class CompanyController {

	private Logger log = LoggerFactory.getLogger(CompanyController.class);

	@Autowired
	private CompanyRepository companyRepo;

	@GetMapping("/company")
	public List<Company> getCompanyList() {
		log.info("Start of CompanyController :: getCompanyList ");
		List<Company> listOfCompanys = (List<Company>) companyRepo.findAll();
		log.info("End of CompanyController :: getCompanyList ");
		return listOfCompanys;
	}

	@GetMapping("/company/{id}")
	public Optional<Company> getCompanyByID(@PathVariable(value = "id") Integer companyId) {
		log.info("Start of CompanyController :: getCompanyByID ");
		Optional<Company> company = companyRepo.findById(companyId);
		log.info("End of CompanyController :: getCompanyByID ");
		return company;
	}

	@PostMapping("/createCompany")
	public Company createCompany(@Valid @RequestBody Company company, BindingResult result, Model model) {
		log.info("Start of CompanyController :: createCompany ");
		return companyRepo.save(company);

	}

	@PutMapping("/updateCompany")
	public Company updateCompany(@Valid @RequestBody Company company, BindingResult result, Model model) {
		log.info("Start of CompanyController :: updateCompany ");
		return companyRepo.save(company);

	}
}
