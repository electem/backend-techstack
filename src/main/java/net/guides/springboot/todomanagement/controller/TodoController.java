package net.guides.springboot.todomanagement.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.Logger;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import net.guides.springboot.todomanagement.model.Todo;
import net.guides.springboot.todomanagement.service.ITodoService;

/**
 * @author elect
 *
 */
@Controller
public class TodoController {
	/**
	 * Logger
	 */
	private static Logger logger = Logger.getLogger(TodoController.class.getName());

	/**
	 * Inject to the ITodoService
	 */
	@Autowired
	private ITodoService todoService;

	/**
	 * @param binder
	 */
	@InitBinder
	public void initBinder(final WebDataBinder binder) {
		logger.info("Start of TodoController :: initBinder");
		// Date - dd/MM/yyyy
		final SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, false));
		logger.info("end of TodoController :: initBinder");
	}

	/**
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/list-todos", method = RequestMethod.GET)
	public String showTodos(final ModelMap model) {
		logger.info("Start of TodoController :: showTodos");
		final String name = getLoggedInUserName(model);
		model.put("todos", todoService.getTodosByUser(name));
		// model.put("todos", service.retrieveTodos(name));
		logger.info("Start of TodoController :: showTodos");
		return "list-todos";
	}

	/**
	 * @param model
	 * @return
	 */
	private String getLoggedInUserName(final ModelMap model) {
		logger.info("Start of TodoController :: getLoggedInUserName");
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		if (principal instanceof UserDetails) {
			return ((UserDetails) principal).getUsername();
		}
		logger.info("end of TodoController :: getLoggedInUserName");
		return principal.toString();
	}

	@RequestMapping(value = "/add-todo", method = RequestMethod.GET)
	public String showAddTodoPage(final ModelMap model) {
		logger.info("Start of TodoController :: getLoggedInUserName");
		model.addAttribute("todo", new Todo());
		logger.info("Start of TodoController :: getLoggedInUserName");
		return "todo";
	}

	/**
	 * 	 service.deleteTodo(id);
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/delete-todo", method = RequestMethod.GET)
	public String deleteTodo(@RequestParam long id) {
		logger.info("Start of TodoController :: deleteTodo");
		todoService.deleteTodo(id);
	
		logger.info("end of TodoController :: deleteTodo");
		return "redirect:/list-todos";
	}

	/**
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/update-todo", method = RequestMethod.GET)
	public String showUpdateTodoPage(@RequestParam final long todoId, final ModelMap model) {
		logger.info("Start of TodoController :: showUpdateTodoPage");
		final Todo todo = todoService.getTodoById(todoId).get();
		model.put("todo", todo);
		logger.info("end of TodoController :: showUpdateTodoPage");
		return "todo";
	}

	/**
	 * @param model
	 * @param todo
	 * @param result
	 * @return
	 */
	@RequestMapping(value = "/update-todo", method = RequestMethod.POST)
	public String updateTodo(final ModelMap model, @Valid final Todo todo, final BindingResult result) {
		logger.info("Start of TodoController :: updateTodo");
		if (result.hasErrors()) {
			return "todo";
		}

		todo.setUserName(getLoggedInUserName(model));
		todoService.updateTodo(todo);
		logger.info("end of TodoController :: updateTodo");
		return "redirect:/list-todos";
	}

	/**
	 * @param model
	 * @param todo
	 * @param result
	 * @return
	 */
	@RequestMapping(value = "/add-todo", method = RequestMethod.POST)
	public String addTodo(final ModelMap model, @Valid final Todo todo, final BindingResult result) {
		logger.info("Start of TodoController :: addTodo");
		if (result.hasErrors()) {
			return "todo";
		}

		todo.setUserName(getLoggedInUserName(model));
		todoService.saveTodo(todo);
		logger.info("end of TodoController :: addTodo");
		return "redirect:/list-todos";
	}

	/**
	 * TodoController
	 */
	public TodoController() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	
}
