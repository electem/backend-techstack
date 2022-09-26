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
@Table(name = "panelDatas")
public class PanelData {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	private String name;

	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "panelData_testsData", joinColumns = {
			@JoinColumn(name = "panelData_id") }, inverseJoinColumns = { @JoinColumn(name = "testsData_id") })
	private List<TestData> testsDatas;

	
	public PanelData(int id, String name, List<TestData> testsDatas) {
		super();
		this.id = id;
		this.name = name;
		this.testsDatas = testsDatas;
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

	
	public List<TestData> getTestsDatas() {
		return testsDatas;
	}

	public void setTestsDatas(List<TestData> testsDatas) {
		this.testsDatas = testsDatas;
	}

}
