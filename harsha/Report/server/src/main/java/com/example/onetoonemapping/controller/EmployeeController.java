package com.example.onetoonemapping.controller;

import java.util.List;
import java.util.stream.Collectors;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.onetoonemapping.models.Employee;
import com.example.onetoonemapping.models.Pagination;
import com.example.onetoonemapping.service.EmployeeService;

@RestController
@CrossOrigin
public class EmployeeController {

	@Autowired
	EmployeeService employeeService;

	@PostMapping("employees/{startPoint}/{pageLength}")
	public List<Employee> employeelist(@Valid @RequestBody Pagination pagination) {
		List<Employee> employeeList = employeeService.findPaginated(pagination.getStartPoint(),
				pagination.getPageLength());

		// get employee based on name using filter()
		List<Employee> employeeListWithName = employeeList.stream().filter(emp -> emp.getName().equalsIgnoreCase("shashi"))
				.collect(Collectors.toList());

		// get employee based on age using filter()
		List<Employee> employeeListWithAgeGreaterThan = employeeList.stream().filter(p -> p.getAge() > 10 && p.getAge() < 30)
				.collect(Collectors.toList());

		// set all employees name as "electem"
		employeeList.forEach(name -> name.setName("electem"));

		// average of employees age using map()
		double averageOfEmpAge = employeeList.stream().mapToInt(p -> p.getAge()).average().getAsDouble();
		
		//get sum of employee age using map and reduce.
		Integer sumOfAge = employeeList.stream()
				.map(empAge -> empAge.getAge()).reduce(Integer::sum).get();

		return employeeList;
	}
}