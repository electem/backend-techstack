package com.example.collection.exp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.collection.exp.model.Company;
import com.example.collection.exp.repository.CompanyRepository;



@Service
public class CompanyService {
	@Autowired
	private CompanyRepository repo;
	
	public List<Company> listAll() {		
		return repo.findAll();
	}

}
