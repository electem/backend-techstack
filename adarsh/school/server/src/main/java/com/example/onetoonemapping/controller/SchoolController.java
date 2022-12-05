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
import com.example.onetoonemapping.models.School;
import com.example.onetoonemapping.repository.SchoolRepository;

@RestController
@CrossOrigin
public class SchoolController {
private Logger log = LoggerFactory.getLogger(SchoolController.class);
	
	@Autowired
	private SchoolRepository schoolRepo;
	
	@GetMapping("/school")
	public  String getSchoolLis() {
		return "hiiiiiii";
	}
	
	@GetMapping("/schools")
	public List<School> getSchoolList() {
		log.info("Start of SchoolController :: getSchoolList ");
		List<School> listOfSchools = (List<School>) schoolRepo.findAll();
		log.info("End of SchoolController :: getSchoolList ");
		return listOfSchools;
	}
	
	@GetMapping("/school/{id}")
	public Optional<School> getSchoolById(@PathVariable(value = "id") Integer schoolId) {
		log.info("Start of SchoolController :: getStudentById ");
		Optional<School> school = schoolRepo.findById(schoolId);
		log.info("End of SchoolController :: getStudentById ");
		return school;
	}
	@PostMapping("/addSchools")
	public School addNewStudent(@Valid @RequestBody School school, BindingResult result, Model model) {
		log.info("Start of StudentController :: addNewStudent ");
		return schoolRepo.save(school);

	}
	@PutMapping("/updateSchoos")
	public School updateStudent(@Valid @RequestBody School school, BindingResult result, Model model) {
		log.info("Start of StudentController :: updateStudent ");
		return schoolRepo.save(school);
	}
	
	@PostMapping("/client/post")
    	private void sendPOST(@Valid @RequestBody School school) throws IOException {
        log.info("Start of StudentController :: sendPOST() ");
        String url = "http://localhost:8080/addSchools";
        String result = "";
        HttpPost post = new HttpPost(url);
        post.setHeader("Content-Type", "application/json;charset=UTF-8");
        post.setHeader("Accept", "application/json, application/json");
        Teachers teachers = new Teachers();
        for (Teachers teacher : school.getTeachers()) {
            teachers.setEmail(teacher.getEmail());
        }
        ObjectMapper objectMapper = new ObjectMapper();
        String json = null;
        json = objectMapper.writeValueAsString(teachers);
        post.setEntity(new StringEntity(json.toString()));
        try (CloseableHttpClient httpClient = HttpClients.createDefault();
                CloseableHttpResponse response = httpClient.execute(post)) {
            result = EntityUtils.toString(response.getEntity());

        }
        String fileName = "E:\\emailproject\\adarsh" + (int) (Math.random() * 100000);
        String htmlStr = schoolService.strToHtmlFile(result, fileName + ".html");
        boolean result1 = schoolService.convert(htmlStr, fileName + ".pdf");
    }

}
