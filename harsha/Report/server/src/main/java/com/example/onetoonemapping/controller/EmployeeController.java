package com.example.onetoonemapping.controller;

import java.util.List;
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

	@PostMapping("employees")
	public List<Employee> employeelist(@Valid @RequestBody Pagination pagination) {

		return employeeService.findPaginated(pagination.getStartPoint(), pagination.getPageLength());
	}
}