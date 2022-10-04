package com.example.postgresdemo.model;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.fasterxml.jackson.annotation.JsonBackReference;

//this is the entity class for category
@Entity
@Table(name = "categories")
@CrossOrigin
public class Category {

	// Filed for entity class
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@NotBlank
	private String title;

	@JsonBackReference
	@ManyToMany(cascade = CascadeType.ALL, mappedBy = "categories")
	private List<Tutorial> tutorials;

	// empty constructor
	public Category() {
	}

	// constructor for initialize filed
	public Category(int id, String title, List<Tutorial> tutorials) {
		this.id = id;
		this.title = title;
		this.tutorials = tutorials;
	}

	// getter and setter for the filed
	public List<Tutorial> getTutorials() {
		return tutorials;
	}

	public void setTutorials(List<Tutorial> tutorials) {
		this.tutorials = tutorials;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
}
