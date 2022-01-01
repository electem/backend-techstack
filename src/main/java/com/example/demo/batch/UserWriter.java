/**
 * 
 */
package com.example.demo.batch;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.spring.batch.model.User;
import com.example.demo.spring.batch.repository.UserRepository;


/**
 * @author Cybertech1
 *
 */
@Component
public class UserWriter implements ItemWriter<User> {
	private static final Logger LOGGER = Logger.getLogger(UserWriter.class.getName());
	@Autowired
	private UserRepository userRepository;

	@Override
	public void write(final List<? extends User> users) throws Exception {
		LOGGER.info("Data saved for users: " + users);
		users.forEach(userRepository::save);
	}
}
