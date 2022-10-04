package com.example.onetoonemapping.models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "tests")
public class Tests {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	private String name;
	@JsonBackReference
	@ManyToMany(mappedBy = "tests")
	private List<Panel> panels;

	public Tests() {
	}

	public Tests(int id, String name, List<Panel> panels) {
		super();
		this.id = id;
		this.name = name;
		this.panels = panels;

	}

	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(int id) {
		this.id = id;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name
	 *            the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

}
