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
@Table(name = "teachers")
public class Teacher {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "teacher_id")
	private int teacherId;

	@Column(name = "teacher_name")
	private String teacherName;

	private String gender;
	private String address;
	private String email;
	private long phoneNo;

	@Column(name = "created_date", nullable = false, updatable = false)
	@CreationTimestamp
	private Date createdDate;

	@JsonIgnoreProperties("teachers")
	@ManyToMany(fetch = FetchType.EAGER, cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinTable(name = "school_teacher", joinColumns = {
			@JoinColumn(name = "teacher_id", referencedColumnName = "teacher_id") }, inverseJoinColumns = {
					@JoinColumn(name = "school_id", referencedColumnName = "school_id") })
	private List<School> schools;
}