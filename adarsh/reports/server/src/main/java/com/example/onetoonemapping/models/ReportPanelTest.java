package com.example.onetoonemapping.models;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReportPanelTest {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	private String data;

	private int panelID;

	private int testID;

	private int reportID;

}