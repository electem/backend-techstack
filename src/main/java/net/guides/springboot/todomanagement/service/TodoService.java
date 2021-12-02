package net.guides.springboot.todomanagement.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.guides.springboot.todomanagement.controller.TodoController;
import net.guides.springboot.todomanagement.model.Todo;
import net.guides.springboot.todomanagement.repository.TodoRepository;

/**
 * @author elect
 *
 */
@Service
public class TodoService implements ITodoService {
	/**
	 * logger 
	 */
	private static Logger logger = Logger.getLogger(TodoService.class.getName());

	/**
	 * todoRepository
	 */
	@Autowired
	private TodoRepository todoRepository;

	/**
	 * get the todo by user
	 */
	@Override
	public List<Todo> getTodosByUser(final String user) {
		logger.info("Start of TodoService :: getTodosByUser");
		List<Todo> findByUserName = null;
		if(user !=null)
		{
		findByUserName = todoRepository.findByUserName(user);
		}
		logger.info("end of TodoService :: getTodosByUser "+user);
		return findByUserName;
	}

	/**
	 *  get the todo by Id
	 */
	@Override
	public Optional<Todo> getTodoById(final long todoId) {
		logger.info("Start of TodoService :: getTodoById");
		 Optional<Todo> findById = null;
		if(todoId!=0)
		{
		  findById = todoRepository.findById(todoId);
		}
		logger.info("end of TodoService :: getTodoById "+todoId);
		return findById;
	}

	/**
	 * updating the todo
	 */
	@Override
	public void updateTodo(final Todo todo) {
		logger.info("Start of TodoService :: updateTodo");
		if(todo !=null)
		{
		todoRepository.save(todo);
		}
		logger.info("end of TodoService :: updateTodo " +todo);
	}

	/**
	 * adding the todo
	 */
	@Override
	public void addTodo(final String name, final String desc,final Date targetDate,final boolean isDone) {
		logger.info("Start of TodoService :: addTodo");
		todoRepository.save(new Todo(name, desc, targetDate, isDone));
		logger.info("end of TodoService :: addTodo ");
	}

	/**
	 * deleting the todo
	 */
	@Override
	public void deleteTodo(final long todoId) {
		logger.info("Start of TodoService :: deleteTodo");
		Optional<Todo> todo = todoRepository.findById(todoId);
		if (todo.isPresent()) {
			todoRepository.delete(todo.get());
		}
		logger.info("end of TodoService :: deleteTodo " +todo);
	}

	/**
	 *save todo 
	 */
	@Override
	public void saveTodo(final Todo todo) {
		logger.info("Start of TodoService :: saveTodo");
		if(todo !=null)
		{
		todoRepository.save(todo);
		}
		logger.info("end of TodoService :: saveTodo "+todo);
	}

	public TodoService() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}