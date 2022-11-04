package com.example.onetoonemapping.controller;

import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.onetoonemapping.models.Department;
import com.example.onetoonemapping.repository.DepermentRepository;

@RestController
@CrossOrigin
public class DepertmentController {

	private Logger log = LoggerFactory.getLogger(DepertmentController.class);

	@Autowired
	private DepermentRepository depermentRepo;

	@GetMapping("/depertment")
	public List<Department> getDepartmentList() {
		log.info("Start of DepertmentController :: getDepartmentList ");
		List<Department> listOfDepartments = (List<Department>) depermentRepo.findAll();
		log.info("End of DepertmentController :: getDepartmentList ");
		return listOfDepartments;
	}

	@GetMapping("/depertment/{id}")
	public Optional<Department> getDepartmentByID(@PathVariable(value = "id") Integer depertmentId) {
		log.info("Start of DepertmentController :: getDepartmentByID ");
		Optional<Department> depertment = depermentRepo.findById(depertmentId);
		log.info("End of DepertmentController :: getDepartmentByID ");
		return depertment;
	}

	@PostMapping("/createDepartment")
	public Department createDepartment(@Valid @RequestBody Department depertment, BindingResult result, Model model) {
		log.info("Start of DepertmentController :: createDepartment ");
		return depermentRepo.save(depertment);

	}

	@PutMapping("/updateDepartment/{id}")
	public Department updateDepartment(@PathVariable("id") int id, @Valid @RequestBody Department depertment) {
		log.info("Start of CompanyController :: updateDepartment ");
		return depermentRepo.save(depertment);

	}

}
