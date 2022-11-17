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
import com.example.onetoonemapping.models.Teachers;
import com.example.onetoonemapping.repository.TeacherRepository;

@RestController
@CrossOrigin
public class TeachersController {
	
	private Logger log = LoggerFactory.getLogger(TeachersController.class);


	@Autowired
	private TeacherRepository teacherRepo;
	
	@GetMapping("/teachers")
	public List<Teachers> getTeacherList() {
		log.info("Start of TeachersController :: getTeacherList ");
		List<Teachers> listOfTeachers = (List<Teachers>) teacherRepo.findAll();
		log.info("End of TeachersController :: getTeacherList ");
		return listOfTeachers;
	}
	@GetMapping("/teacher/{id}")
	public Optional<Teachers> getTeacherById(@PathVariable(value = "id") Integer teacherId) {
		log.info("Start of TeachersController :: getTeacherById ");
		Optional<Teachers> teacher = teacherRepo.findById(teacherId);
		log.info("End of TeachersController :: getTeacherById ");
		return teacher;
	}
	@PostMapping("/addTeachers")
	public Teachers addNewTeacher(@Valid @RequestBody Teachers teacher, BindingResult result, Model model) {
		log.info("Start of TeachersController :: addNewTeacher ");
		return teacherRepo.save(teacher);

	}
	
	@PutMapping("/updateTeachers")
	public Teachers updateTeachers(@Valid @RequestBody Teachers teacher, BindingResult result, Model model) {
		log.info("Start of TeachersController :: updateTeachers ");
		return teacherRepo.save(teacher);
	}

	
}
