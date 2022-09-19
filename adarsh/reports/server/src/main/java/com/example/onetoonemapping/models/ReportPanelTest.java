package com.example.onetoonemapping.models;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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

	/**
	 * @return the data
	 */
	public String getData() {
		return data;
	}

	/**
	 * @param data
	 *            the data to set
	 */
	public void setData(String data) {
		this.data = data;
	}

	/**
	 * @return the panelID
	 */
	public int getPanelID() {
		return panelID;
	}

	/**
	 * @param panelID
	 *            the panelID to set
	 */
	public void setPanelID(int panelID) {
		this.panelID = panelID;
	}

	/**
	 * @return the testID
	 */
	public int getTestID() {
		return testID;
	}

	/**
	 * @param testID
	 *            the testID to set
	 */
	public void setTestID(int testID) {
		this.testID = testID;
	}

	/**
	 * @return the reportFD
	 */
	public int getReportID() {
		return reportID;
	}

	/**
	 * @param reportFD
	 *            the reportFD to set
	 */
	public void setReportID(int reportID) {
		this.reportID = reportID;
	}
	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(int id) {
		this.id = id;
	}
	
	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "ReportPanelTest [data=" + data + ", panelID=" + panelID + ", testID=" + testID + ", reportID="
				+ reportID + "]";
	}

	
}
