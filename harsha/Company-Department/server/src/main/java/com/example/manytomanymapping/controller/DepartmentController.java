package com.example.manytomanymapping.controller;

import java.util.List;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.manytomanymapping.exceptions.ResourceNotFoundException;
import com.example.manytomanymapping.models.Department;
import com.example.manytomanymapping.repository.DepartmentRepository;

@RestController
@CrossOrigin
public class DepartmentController {
	



	/**
	 * Logger raghu testing
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

	// This block of code is used to save a department to the DB.
	@PostMapping("/createDepartment")
	public Department createDepartment(@Valid @RequestBody Department department) {
		LOG.info("Start of DepartmentController :: createDepartment");
		return departmentRepository.save(department);
	}

	// This block of code is used to get a department by Id from DB.
	@GetMapping("/department/{id}")
	public ResponseEntity<Department> getDepartmentById(@PathVariable(value = "id") Integer id)
			throws ResourceNotFoundException {
		LOG.info("Start of DepartmentController :: getDepartmentById ");
		Department department = departmentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Department not found :: " + id));
		LOG.info("End of DepartmentController :: getDepartmentById ");
		return ResponseEntity.ok().body(department);
	}

	// This block of code is used to update a department to the DB.
	@PutMapping("/updateDepartment/{id}")
	public Department updateDepartment(@PathVariable("id") int id, @Valid @RequestBody Department department) {
		LOG.info("Start of DepartmentController :: updateDepartment ");
		return departmentRepository.save(department);
	}
}