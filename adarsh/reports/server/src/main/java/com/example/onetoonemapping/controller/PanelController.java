package com.example.onetoonemapping.controller;

import java.io.FileReader;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.validation.Valid;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
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
import com.example.onetoonemapping.models.Panel;
import com.example.onetoonemapping.repository.PanelRepository;

@RestController
@CrossOrigin
public class PanelController {

	@Autowired
	private PanelRepository panelRepository;

	@GetMapping("/panels")
	public List<Panel> getPanelList() {
		List<Panel> panels = (List<Panel>) panelRepository.findAll();
		return panels;
	}

	@GetMapping("/panels/{id}")
	public Optional<Panel> getTutorialById(@PathVariable(value = "id") Integer tutorialId) {
		Optional<Panel> panels = panelRepository.findById(tutorialId);
		return panels;
	}

	@PostMapping("/createPanel")
	public Panel createPanel(@Valid @RequestBody Panel panel, BindingResult result, Model model) {

		return panelRepository.save(panel);

	}

	@PutMapping("/updatePanel")
	public String updatePanel(@Valid @RequestBody Panel panel, BindingResult result, Model model) {
		if (result.hasErrors()) {
			return "update-Panel";
		}
		panelRepository.save(panel);
		return "Panel data updated";
	}

	@GetMapping("/studentlData")
	public Object getStudentData() throws Exception {
		JSONParser jsonParser = new JSONParser();
		FileReader reader = new FileReader("check.json");
		Object obj = jsonParser.parse(reader);
		JSONArray studentDataList = (JSONArray) obj;
		return studentDataList;
	}

	@PostMapping("/studentData")
	public Object creatStudent(@Valid @RequestBody Pagination pagination) throws Exception {
		JSONParser jsonParser = new JSONParser();
		FileReader reader = new FileReader("check.json");
		Object obj = jsonParser.parse(reader);
		JSONArray studentDataList = (JSONArray) obj;
		return studentDataList.subList(pagination.getStart(), pagination.getLength());
	}

	@PostMapping("/PanelData")
	public Panel postPanel(@Valid @RequestBody Map<String, String> input) {
		Panel panel = new Panel();
		panel.setName(input.get("name"));
		panel.setDescription(input.get("description"));
		return panelRepository.save(panel);

	}

}
