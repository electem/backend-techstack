package com.example.onetoonemapping.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import com.example.onetoonemapping.models.Employee;
import com.example.onetoonemapping.service.EmployeeService;

@RestController
public class EmployeeController {

	@Autowired
	EmployeeService employeeService;
	
	@GetMapping("/employees/{pageNo}/{pageSize}")
	public List<Employee> getPaginatedCountries(@PathVariable int pageNo,@PathVariable int pageSize) {

		return employeeService.findPaginated(pageNo, pageSize);
	}
}
//// JSON parser object to parse read file
//JSONParser jsonParser = new JSONParser();
//
//FileReader reader = new FileReader("check.json");
//// Read JSON file
//Object obj = jsonParser.parse(reader);
//JSONArray employeeList = (JSONArray) obj;