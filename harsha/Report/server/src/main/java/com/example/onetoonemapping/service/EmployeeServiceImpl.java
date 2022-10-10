package com.example.onetoonemapping.service;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.example.onetoonemapping.controller.TestsController;
import com.example.onetoonemapping.models.Employee;
import com.example.onetoonemapping.repository.EmployeeRepository;

@Service
public class EmployeeServiceImpl implements EmployeeService {

	/**
	 * Logger
	 */
	private static final Logger LOG = LoggerFactory.getLogger(TestsController.class);

	@Autowired
	private EmployeeRepository employeeRepository;

	@Override
	public List<Employee> findPaginated(int startPoint, int pageLength) {
		LOG.info("Start of EmployeeServiceImpl :: findPaginated ");
		Pageable paging = PageRequest.of(startPoint, pageLength);
		Page<Employee> pagedResult = employeeRepository.findAll(paging);
		LOG.info("End of EmployeeServiceImpl :: findPaginated ");
		return pagedResult.toList();
	}
}