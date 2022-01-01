package com.example.demo.batch;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

import org.springframework.batch.item.ItemProcessor;
import org.springframework.stereotype.Component;

import com.example.demo.spring.batch.model.User;


@Component
public class UserProcessor implements ItemProcessor<User, User> {
	 private static final Logger LOGGER = Logger.getLogger(UserProcessor.class.getName());
	
	 private static final Map<String, String> DEPT_NAMES = new HashMap<>();
	
	 public UserProcessor() {
	        DEPT_NAMES.put("001", "Technologies");
	        DEPT_NAMES.put("002", "Operations");
	        DEPT_NAMES.put("003", "Accounts");
	    }

	@Override
	public User process(User user) throws Exception {
		String deptCode = user.getDept();
        String dept = DEPT_NAMES.get(deptCode);
        user.setDept(dept);
        user.setTime(new Date());
        LOGGER.info(String.format("Converted from [%s] to [%s]", deptCode, dept));
        return user;
	}

}
