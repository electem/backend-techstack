package com.example.onetoonemapping.models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.JoinColumn;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "schools")
public class School {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String name;
	private String address;
	
	@JsonIgnoreProperties("schools")
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "schools_teachers", joinColumns = {
			@JoinColumn(name = "schools_id") }, inverseJoinColumns = { @JoinColumn(name = "teachers_id") })
	private List<Teachers> teachers;
	
	@JsonIgnoreProperties("schools")
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "schools_id")
	private List<Student> students;
}
