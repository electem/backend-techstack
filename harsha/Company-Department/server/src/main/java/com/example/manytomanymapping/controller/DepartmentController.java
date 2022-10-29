package com.example.manytomanymapping.controller;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.manytomanymapping.models.Department;
import com.example.manytomanymapping.repository.DepartmentRepository;

@RestController
@CrossOrigin
public class DepartmentController {

	/**
	 * Logger
	 */
	private static final Logger LOG = LoggerFactory.getLogger(DepartmentController.class);

	@Autowired
	DepartmentRepository departmentRepository;

	// This block of code is used to get departments list from DB.
	@GetMapping("/departments")
	public List<Department> getDepartmentsList() {
		LOG.info("Start of DepartmentController :: getDepartmentsList ");
		List<Department> departments = (List<Department>) departmentRepository.findAll();
		LOG.info("End of DepartmentController :: getDepartmentsList ");
		return departments;
	}
}