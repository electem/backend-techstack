package com.example.collection.exp.controller;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.collection.exp.model.Company;
import com.example.collection.exp.repository.CompanyRepository;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class CollectionsControllerOpeartion {
	@Autowired
	private CompanyRepository companyRepository;

	@GetMapping("/get")
	public void testCollection() {
		// List of company
		List<Company> companyList = companyRepository.findAll();
		long emptyCount = companyList.stream().filter(cmpList -> cmpList.getName().isEmpty()).count();
		log.info("Test1: # of Empty Strings: " + emptyCount);
		// Print company with character length > 6
		long lengthCount = companyList.stream().filter(x -> x.getName().length() > 6).count();
		log.info("Test2: # of companies with char length > 6: " + lengthCount);

		// Match the pattern which starts with letter 'T' and print count
		Long startCount = companyList.stream().filter(x -> x.getName().startsWith("T")).count();
		log.info("Test3: # of companies which name starts with letter T: " + startCount);

		// Create a List with String > 6 characters
		List<Company> newList = companyList.stream().filter(x -> x.getName().length() > 6).collect(Collectors.toList());
		System.out.println("Test5: New company list which has total characters > 6: " + newList + "\n");

		// Remove all empty Strings from List
		List<Company> removeEmptyStrings = companyList.stream().filter(x -> !x.getName().isEmpty())
				.collect(Collectors.toList());
		log.info("Test4: New Company List without empty list" + removeEmptyStrings);

		List<Company> result = companyList.stream() // Convert list to stream
				.filter(name -> !"ggg".equals(name.getName())) // remove "ggg" ggg from list
				.collect(Collectors.toList());
		// Lambda
		companyList.forEach(item -> System.out.println(item));
	}
}
