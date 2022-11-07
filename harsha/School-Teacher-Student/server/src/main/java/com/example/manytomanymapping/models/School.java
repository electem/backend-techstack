package com.example.manytomanymapping.models;

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
import javax.persistence.OneToMany;
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
@Table(name = "schools")
public class School {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String name;
	private String address;

	@Column(name = "created_date", nullable = false, updatable = false)
	@CreationTimestamp
	private Date createdDate;

	@JsonIgnoreProperties("schools")
	@ManyToMany(fetch = FetchType.EAGER, cascade = { CascadeType.MERGE ,CascadeType.PERSIST})
	@JoinTable(name = "school_teacher", joinColumns = {
			@JoinColumn(name = "school_id", referencedColumnName = "id") }, inverseJoinColumns = {
					@JoinColumn(name = "teacher_id", referencedColumnName = "id") })
	private List<Teacher> teachers;

	@JsonIgnoreProperties("school")
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "school_id")
	private List<Student> students;
}