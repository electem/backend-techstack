package com.example.onetoonemapping.controller;

import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.onetoonemapping.exceptions.ResourceNotFoundException;
import com.example.onetoonemapping.models.Panel;
import com.example.onetoonemapping.repository.PanelRepository;

@RestController
@CrossOrigin
public class PanelController {

	@Autowired
	PanelRepository panelRepository;

	@GetMapping("/panels")
	public List<Panel> getPanelList() {
		List<Panel> panels = (List<Panel>) panelRepository.findAll();
		return panels;
	}

	@GetMapping("/panels/{id}")
	public ResponseEntity<Panel> getPanelById(@PathVariable(value = "id") Integer id)
			throws ResourceNotFoundException {
		Panel panel = panelRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Panel not found :: " + id));

		return ResponseEntity.ok().body(panel);
	}
	
	@PostMapping("/createPanel")
	public String createPanel(@Valid @RequestBody Panel panel, BindingResult result, Model model) {
		if (result.hasErrors()) {
			return "Panel";
		}
		panelRepository.save(panel);
		return "Panel data added";
	}

	@PutMapping("/updatePanel/{id}")
	public String updatePanel(@PathVariable("id") int id,@Valid @RequestBody Panel panel, BindingResult result,
			Model model) {
		if (result.hasErrors()) {
			return "update-Panel";
		}
		panelRepository.save(panel);
		return "Panel data updated";
	}
}
