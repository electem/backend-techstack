package com.example.onetoonemapping.models;

import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "companies")
public class Company {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String name;
	private String address;
	private String email;

	@Column(name = "created_date", nullable = false, updatable = false)
	@CreationTimestamp
	private Date createdDate;
	
	@JsonIgnoreProperties("companies")
	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
	@JoinTable(name = "companies_departments", joinColumns = { @JoinColumn(name = "companies_id") }, inverseJoinColumns = {
			@JoinColumn(name = "departments_id") })
	private List<Department> departments;
	
//	@ManyToMany(cascade = CascadeType.ALL)
//	@JoinTable(name = "companies_departments", joinColumns = {
//			@JoinColumn(name = "companies_id") }, inverseJoinColumns = { @JoinColumn(name = "departments_id") })
//	private List<Department> departments;
}
