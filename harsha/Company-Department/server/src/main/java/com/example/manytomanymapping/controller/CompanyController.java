package com.example.manytomanymapping.controller;

import java.util.List;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.manytomanymapping.exceptions.ResourceNotFoundException;
import com.example.manytomanymapping.models.Company;
import com.example.manytomanymapping.repository.CompanyRepository;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
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

	// This block of code is used to get a company by Id from DB.
	@GetMapping("/company/{id}")
	public ResponseEntity<Company> getCompanyById(@PathVariable(value = "id") Integer id)
			throws ResourceNotFoundException {
		LOG.info("Start of CompanyController :: getCompanyById ");
		Company company = companyRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Company not found :: " + id));
		LOG.info("End of CompanyController :: getCompanyById ");
		return ResponseEntity.ok().body(company);
	}

	// This block of code is used to update a company to the DB.
	@PutMapping("/updateCompany/{id}")
	public Company updateCompany(@PathVariable("id") int id, @Valid @RequestBody Company company) {
		LOG.info("Start of CompanyController :: updateCompany ");
		return companyRepository.save(company);
	}
	
	
	// This method is used to delete company by id from DB.
	 @DeleteMapping("/deleteCompany/{id}")
	  public ResponseEntity<HttpStatus> deleteCompany(@PathVariable("id") int id) {
		 LOG.info("Start of CompanyController :: deleteCompany ");
		 companyRepository.deleteById(id);
		 LOG.info("End of CompanyController :: deleteCompany ");
	    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	  }
}