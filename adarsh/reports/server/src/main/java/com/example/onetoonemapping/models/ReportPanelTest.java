package com.example.onetoonemapping.models;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
//@Entity
//@Table(name = "report_panel_tests")
public class ReportPanelTest {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	private String data;

	private int panelID;

	private int testID;

	private int reportID;

	public ReportPanelTest(int id, String data, int panelID, int testID, int reportID) {
		super();
		this.id = id;
		this.data = data;
		this.panelID = panelID;
		this.testID = testID;
		this.reportID = reportID;
	}

	public ReportPanelTest() {

	}

	
	public String getData() {
		return data;
	}

	
	public void setData(String data) {
		this.data = data;
	}

	
	public int getPanelID() {
		return panelID;
	}

	
	public void setPanelID(int panelID) {
		this.panelID = panelID;
	}

	
	public int getTestID() {
		return testID;
	}

	
	public void setTestID(int testID) {
		this.testID = testID;
	}

	
	public int getReportID() {
		return reportID;
	}

	
	public void setReportID(int reportID) {
		this.reportID = reportID;
	}
	
	public int getId() {
		return id;
	}

	
	public void setId(int id) {
		this.id = id;
	}
	
	
	@Override
	public String toString() {
		return "ReportPanelTest [data=" + data + ", panelID=" + panelID + ", testID=" + testID + ", reportID="
				+ reportID + "]";
	}

	
}
