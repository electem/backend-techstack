package com.example.onetoonemapping.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import javax.annotation.PostConstruct;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.onetoonemapping.exceptions.ResourceNotFoundException;
import com.example.onetoonemapping.models.Panel;
import com.example.onetoonemapping.repository.PanelRepository;
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

	/**
	 * Logger
	 */
	private static final Logger LOG = LoggerFactory.getLogger(PanelController.class);

	@Autowired
	PanelRepository panelRepository;

	@Value("classpath:schema.graphqls")
	private Resource schemaResource;

	private GraphQL graphQL;

	@PostConstruct
	public void loadSchema() throws IOException {
		File schemaFile = schemaResource.getFile();
		TypeDefinitionRegistry registry = new SchemaParser().parse(schemaFile);
		RuntimeWiring wiring = buildWiring();
		GraphQLSchema schema = new SchemaGenerator().makeExecutableSchema(registry, wiring);
		graphQL = GraphQL.newGraphQL(schema).build();
	}

	private RuntimeWiring buildWiring() {
		DataFetcher<List<Panel>> fetcher1 = data -> {
			return (List<Panel>) panelRepository.findAll();
		};

		DataFetcher<Panel> fetcher2 = data -> {
			return panelRepository.findByName(data.getArgument("name"));
		};

		return RuntimeWiring.newRuntimeWiring().type("Query",
				typeWriting -> typeWriting.dataFetcher("getAllPanels", fetcher1).dataFetcher("findPanel", fetcher2))
				.build();
	}

	@PostMapping("/getAllPanels")
	public ResponseEntity<Object> getAllPanels(@RequestBody String query) {
		ExecutionResult result = graphQL.execute(query);
		return new ResponseEntity<Object>(result, HttpStatus.OK);
	}

	@PostMapping("/getPanelByName")
	public ResponseEntity<Object> getPanelByName(@RequestBody String query) {
		ExecutionResult result = graphQL.execute(query);
		return new ResponseEntity<Object>(result, HttpStatus.OK);
	}

	// This block of code is used to get panels list from DB.
	@GetMapping("/panels")
	public List<Panel> getPanelList() {
		LOG.info("Start of PanelController :: getPanelList ");
		List<Panel> panels = (List<Panel>) panelRepository.findAll();
		LOG.info("Start of PanelController :: getPanelList ");
		return panels;
	}

	// This block of code is used to get a panel by panelId from DB.
	@GetMapping("/panels/{id}")
	public ResponseEntity<Panel> getPanelById(@PathVariable(value = "id") Integer id) throws ResourceNotFoundException {
		LOG.info("Start of PanelController :: getPanelById ");
		Panel panel = panelRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Panel not found :: " + id));
		LOG.info("Start of PanelController :: getPanelById ");
		return ResponseEntity.ok().body(panel);
	}

	// This block of code is used to save a panel to the DB.
	@PostMapping("/createPanel")
	public Panel createPanel(@Valid @RequestBody Panel panel) {
		LOG.info("Start of PanelController :: createPanel ");
		return panelRepository.save(panel);
	}

	// This block of code is used to update a panel to the DB.
	@PutMapping("/updatePanel/{id}")
	public Panel updatePanel(@PathVariable("id") int id, @Valid @RequestBody Panel panel) {
		LOG.info("Start of PanelController :: updatePanel ");
		return panelRepository.save(panel);
	}

	// This block of code is used to save a panel to the DB using Map.
	@PostMapping("/createPanelByMap")
	public Panel createPanelByMap(@Valid @RequestBody Map<String, String> map) {
		LOG.info("Start of PanelController :: createPanelByMap ");
		Panel panel = new Panel();
		panel.setName(map.get("name"));
		panel.setDescription(map.get("description"));
		LOG.info("Start of PanelController :: createPanelByMap ");
		return panelRepository.save(panel);
	}

	// This method is used to delete panel by id from DB.
	@DeleteMapping("/deletePanel/{id}")
	public ResponseEntity<HttpStatus> deletePanel(@PathVariable("id") int id) {
		LOG.info("Start of PanelController :: deletePanel ");
		panelRepository.deleteById(id);
		LOG.info("End of PanelController :: deletePanel ");
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@GetMapping("/panelsList")
	public Page<Panel> getAllPanels(Pageable pageable) {
		return panelRepository.findAll(pageable);
	}
}