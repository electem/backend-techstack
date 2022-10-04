//package com.example.onetoonemapping.controller;
//
//import java.util.List;
//import javax.validation.Valid;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//import com.example.onetoonemapping.models.PanelData;
//import com.example.onetoonemapping.repository.PanelDataRepository;
//
//@RestController
//public class PanelDataController {
//	@Autowired
//	PanelDataRepository panelDataRepository;
//
//	@GetMapping("/panelData")
//	public List<PanelData> getPanelData() {
//		List<PanelData> panelData = (List<PanelData>) panelDataRepository.findAll();
//		return panelData;
//	}
//
//	@PostMapping("/createPanelData")
//	public PanelData createPanelData(@Valid @RequestBody PanelData panelData) {
//		return panelDataRepository.save(panelData);
//
//	}
//
//}
