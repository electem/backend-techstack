package com.example.onetoonemapping.service;

import java.util.List;
import com.example.onetoonemapping.models.Employee;

public interface EmployeeService {
	List<Employee> findPaginated(int startPoint, int pageLength);
}