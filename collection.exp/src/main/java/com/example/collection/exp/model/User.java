/**
 * 
 */
package com.example.collection.exp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author elect
 *
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
	private int id;
	private String userName;
	private String password;
	private String email;
}
