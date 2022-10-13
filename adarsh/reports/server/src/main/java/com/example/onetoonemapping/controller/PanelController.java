package com.example.onetoonemapping.controller;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import javax.annotation.PostConstruct;
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
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import graphql.ExecutionResult;
import graphql.GraphQL;
import graphql.schema.DataFetcher;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;

@RestController
@CrossOrigin
public class PanelController {

	private Logger log = LoggerFactory.getLogger(PanelController.class);

	@Value("${inputFile}")
	private String studentFile;

//	@Value("classpath:schema.graphqls")
//	private Resource schemaResource;

	@Autowired
	private PanelRepository panelRepository;

//	private GraphQL graphQL;
//
//	@PostConstruct
//	public void loadSchema() throws IOException {
//		File schemaFile = schemaResource.getFile();
//		TypeDefinitionRegistry registry = new SchemaParser().parse(schemaFile);
//		RuntimeWiring wiring = buildWiring();
//		GraphQLSchema schema = new SchemaGenerator().makeExecutableSchema(registry, wiring);
//		graphQL = GraphQL.newGraphQL(schema).build();
//	}
//
//	private RuntimeWiring buildWiring() {
//		DataFetcher<List<Panel>> fetcher1 = data -> {
//			return (List<Panel>) panelRepository.findAll();
//		};
//
//		return RuntimeWiring.newRuntimeWiring()
//				.type("Query", typeWriting -> typeWriting.dataFetcher("getAllPanel", fetcher1)).build();
//
//	}
//
//	@PostMapping("/getAllPanel")
//	public ResponseEntity<Object> getAllPanel(@RequestBody String query) {
//		ExecutionResult result = graphQL.execute(query);
//		return new ResponseEntity<Object>(result, HttpStatus.OK);
//	}

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