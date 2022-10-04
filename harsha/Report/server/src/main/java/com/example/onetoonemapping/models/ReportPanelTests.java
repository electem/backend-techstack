package com.example.onetoonemapping.models;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class ReportPanelTests {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	private String data;

	private int reportId;

	private int panelId;

	private int testId;

	public ReportPanelTests() {
	}

	public ReportPanelTests(String data, int reportId, int panelId, int testId) {
		this.data = data;
		this.reportId = reportId;
		this.panelId = panelId;
		this.testId = testId;
	}

	public ReportPanelTests(int id, String data, int reportId, int panelId, int testId) {
		this.id = id;
		this.data = data;
		this.reportId = reportId;
		this.panelId = panelId;
		this.testId = testId;
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

	public int getReportId() {
		return reportId;
	}

	public void setReportId(int reportId) {
		this.reportId = reportId;
	}

	public int getPanelId() {
		return panelId;
	}

	public void setPanelId(int panelId) {
		this.panelId = panelId;
	}

	public int getTestId() {
		return testId;
	}

	public void setTestId(int testId) {
		this.testId = testId;
	}
}