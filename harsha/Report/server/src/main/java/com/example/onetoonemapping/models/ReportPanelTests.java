package com.example.onetoonemapping.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "report_panel_tests")
public class ReportPanelTests {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	private String data;

	public ReportPanelTests() {
	}

	public ReportPanelTests(int id, String data) {
		this.id = id;
		this.data = data;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}
}