package com.example.onetoonemapping.models;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "panels")
public class Panel {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	private String name;

	private String description;

	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "panels_tests", joinColumns = { @JoinColumn(name = "panels_id") }, inverseJoinColumns = {
			@JoinColumn(name = "tests_id") })
	private List<Tests> tests;

	public Panel() {
	}

	public Panel(int id, String name, String description, List<Tests> tests) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.tests = tests;

	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Tests> getTests() {
		return tests;
	}

	public void setTests(List<Tests> tests) {
		this.tests = tests;
	}

}
