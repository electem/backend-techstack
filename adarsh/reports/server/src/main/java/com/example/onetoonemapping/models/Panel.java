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
import lombok.Builder;
import lombok.Data;

@Data
@Entity
@Builder
@Table(name = "panels")
public class Panel {

	public Panel() {
		// TODO Auto-generated constructor stub
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int panelId;

	private String panelName;

	private String panelDescription;

	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "panels_tests", joinColumns = { @JoinColumn(name = "panels_id") }, inverseJoinColumns = {
			@JoinColumn(name = "tests_id") })
	private List<Tests> tests;

	
	
	

}