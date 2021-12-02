package net.guides.springboot.todomanagement.service;

import java.util.Date;

import java.util.List;
import java.util.Optional;

import net.guides.springboot.todomanagement.model.Todo;

/**
 * @author elect
 *
 */
public interface ITodoService {

	List<Todo> getTodosByUser(final String user);

	Optional<Todo> getTodoById(final long todoId);

	void updateTodo(Todo todo);

	void addTodo(final String name,final  String desc, final Date targetDate, final boolean isDone);

	void deleteTodo(final long todoId);
	
	void saveTodo(final Todo todo);

}