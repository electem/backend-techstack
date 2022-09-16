package com.example.onetoonemapping.models;

import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
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

//	@OneToMany(mappedBy = "testId", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//	private Set<ReportPanelTest> reportlist;

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

	/**
	 * @return the panels
	 */
	public List<Panel> getPanels() {
		return panels;
	}

	/**
	 * @param panels
	 *            the panels to set
	 */
	public void setPanels(List<Panel> panels) {
		this.panels = panels;
	}


}
