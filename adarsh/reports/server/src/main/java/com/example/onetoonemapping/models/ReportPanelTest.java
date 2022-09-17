package com.example.onetoonemapping.models;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
	
public class ReportPanelTest {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	private String data;

	private int panelFk;

	private int testFk;

	private int reportFk;

	
	public ReportPanelTest(int id, String data, int panelFk, int testFk, int reportFk) {
		super();
		this.id = id;
		this.data = data;
		this.panelFk = panelFk;
		this.testFk = testFk;
		this.reportFk = reportFk;
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


	
	public int getPanelFk() {
		return panelFk;
	}


	
	public void setPanelFk(int panelFk) {
		this.panelFk = panelFk;
	}


	
	public int getTestFk() {
		return testFk;
	}


	public void setTestFk(int testFk) {
		this.testFk = testFk;
	}


	
	public int getReportFk() {
		return reportFk;
	}

	public void setReportFk(int reportFk) {
		this.reportFk = reportFk;
	}
	

	
}
