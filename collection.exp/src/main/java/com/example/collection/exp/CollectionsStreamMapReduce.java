/**
 * 
 */
package com.example.collection.exp;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.example.collection.exp.model.User;
import com.example.collection.exp.model.UserDTO;

import lombok.extern.slf4j.Slf4j;

/**
 * @author elect
 *
 */
@Slf4j
public class CollectionsStreamMapReduce {
	public static void main(String[] args) {
		List<User> users = new ArrayList<>();
		users.add(new User(1, "Ramesh", "secrete", "ramesh@gmail.com"));
		users.add(new User(2, "Tony", "secrete", "tony@gmail.com"));
		users.add(new User(3, "Tom", "secrete", "tom@gmail.com"));
		//using  using stream().map()
		mapToObject(users);
	}
    //map to user object to userDto object.
	private static void mapToObject(List<User> users) {
		List<UserDTO> usersDTOs = users.stream()
				.map((User user) -> new UserDTO(user.getId(), user.getUserName(), user.getEmail()))
				.collect(Collectors.toList());

		usersDTOs.forEach(use -> log.info(use.getEmail() + " " + use.getUserName()));
	}
}
