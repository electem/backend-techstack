package com.example.onetoonemapping.controller;

import java.util.List;
import java.util.stream.Collectors;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

	/**
	 * Logger
	 */
	private static final Logger LOG = LoggerFactory.getLogger(EmployeeController.class);

	@Autowired
	EmployeeService employeeService;

	// This block of code will return employees list based on starting point and
	// page length of page.
	@PostMapping("employees/{startPoint}/{pageLength}")
	public List<Employee> employeelist(@Valid @RequestBody Pagination pagination) {
		LOG.info("Start of EmployeeController :: employeelist ");
		List<Employee> employeeList = employeeService.findPaginated(pagination.getStartPoint(),
				pagination.getPageLength());

		// This line of code will return employees based on employee name using filter()
		// method.
		List<Employee> employeeListWithName = employeeList.stream()
				.filter(emp -> emp.getName().equalsIgnoreCase("shashi")).collect(Collectors.toList());

		// This line of code will return employee based on employee age using filter()
		// method.
		List<Employee> employeeListWithAgeGreaterThan = employeeList.stream()
				.filter(p -> p.getAge() > 10 && p.getAge() < 30).collect(Collectors.toList());

		// This line of code will set all employees name as "electem"
		employeeList.forEach(name -> name.setName("electem"));

		// This line of code will return average of employees age using map() method.
		double averageOfEmpAge = employeeList.stream().mapToInt(p -> p.getAge()).average().getAsDouble();

		// This line of code will return sum of employee age using map and reduce
		// method.
		Integer sumOfAge = employeeList.stream().map(empAge -> empAge.getAge()).reduce(Integer::sum).get();
		LOG.info("End of EmployeeController :: employeelist ");
		return employeeList;
	}
}