/**
 * 
 */
package com.example.demo.spring.batch.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Cybertech1
 *
 */
@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WriteUser {
	    @Id
	    private Long id;
	    private String name;
	    private String dept;
	    private Integer salary;
}