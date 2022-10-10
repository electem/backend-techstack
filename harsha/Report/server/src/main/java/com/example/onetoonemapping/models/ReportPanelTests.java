package com.example.onetoonemapping.models;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Data;

@Data
public class ReportPanelTests {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	private String data;

	private int reportId;

	private int panelId;

	private int testId;
}