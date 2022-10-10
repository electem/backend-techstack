package com.example.onetoonemapping.controller;

import java.io.FileReader;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.onetoonemapping.models.Pagination;
import com.example.onetoonemapping.models.Panel;
import com.example.onetoonemapping.repository.PanelRepository;

@RestController
@CrossOrigin
public class PanelController {

	private Logger log = LoggerFactory.getLogger(PanelController.class);

	@Value("${inputFile}")
	private String studentFile;

	@Autowired
	private PanelRepository panelRepository;

	/**
	 * @GetMapping
	 * @return list of panels
	 */
	@GetMapping("/panels")
	public List<Panel> getPanelList() {
		log.info("Start of PanelController :: getPanelList ");
		List<Panel> listOfPanels = (List<Panel>) panelRepository.findAll();
		log.info("End of PanelController :: getPanelList ");
		return listOfPanels;
	}

	/**
	 * @GetMapping
	 * @param panelId
	 * @return list of panels
	 */
	@GetMapping("/panels/{id}")
	public Optional<Panel> getTutorialById(@PathVariable(value = "id") Integer panelId) {
		log.info("Start of PanelController :: getTutorialById ");
		Optional<Panel> panels = panelRepository.findById(panelId);
		log.info("End of PanelController :: getTutorialById ");
		return panels;
	}

	/**
	 * @GetMapping
	 * @param panel
	 * @return list of panels to saved
	 */
	@PostMapping("/createPanel")
	public Panel createPanel(@Valid @RequestBody Panel panel, BindingResult result, Model model) {
		log.info("Start of PanelController :: createPanel ");
		return panelRepository.save(panel);

	}

	/**
	 * @GetMapping
	 * @param panel
	 * @return updatePanel
	 */
	@PutMapping("/updatePanel")
	public Panel updatePanel(@Valid @RequestBody Panel panel, BindingResult result, Model model) {
		log.info("Start of PanelController :: updatePanel ");
		return panelRepository.save(panel);
	}

	/**
	 * @GetMapping
	 * @param
	 * @return list of studentDataList
	 */
	@GetMapping("/studentlData")
	public Object getStudentData() throws Exception {
		log.info("Start of PanelController :: getStudentData ");
		JSONParser jsonParser = new JSONParser();
		final FileReader reader = new FileReader(studentFile);
		Object obj = jsonParser.parse(reader);
		JSONArray studentDataList = (JSONArray) obj;
		reader.close();
		log.info("End of PanelController :: getStudentData ");
		return studentDataList;
	}

	/**
	 * @GetMapping
	 * @param offset,pageSize
	 * @return list of student
	 */
	@GetMapping("/pagination/{offset}/{pageSize}")
	public Object getPanelPagination(@PathVariable int offset, @PathVariable int pageSize) throws Exception {
		log.info("Start of PanelController :: getPanelPagination ");
		JSONParser jsonParser = new JSONParser();
		final FileReader reader = new FileReader(studentFile);
		Object obj = jsonParser.parse(reader);
		JSONArray studentDataList = (JSONArray) obj;
		reader.close();
		log.info("End of PanelController :: getPanelPagination ");
		return studentDataList.subList(offset, pageSize);
	}

	/**
	 * @PostMapping
	 * @param pagination
	 * @return list of student list with pagination
	 */
	@PostMapping("/studentData")
	public Object creatStudent(@Valid @RequestBody Pagination pagination) throws Exception {
		log.info("Start of PanelController :: creatStudent ");
		JSONParser jsonParser = new JSONParser();
		final FileReader reader = new FileReader(studentFile);
		Object obj = jsonParser.parse(reader);
		JSONArray studentDataList = (JSONArray) obj;
		log.info("End of PanelController :: creatStudent ");
		return studentDataList.subList(pagination.getStart(), pagination.getLength());
	}
}