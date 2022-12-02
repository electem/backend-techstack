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
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "panels")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Panel {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	private String name;

	private String description;

	@ManyToMany(cascade = CascadeType.MERGE)
	@JoinTable(name = "panels_tests", joinColumns = { @JoinColumn(name = "panels_id") }, inverseJoinColumns = {
			@JoinColumn(name = "tests_id") })
	private List<Tests> tests;
}