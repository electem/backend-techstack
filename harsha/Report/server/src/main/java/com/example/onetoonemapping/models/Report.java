package com.example.onetoonemapping.models;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import org.hibernate.annotations.CreationTimestamp;
import lombok.Builder;
import lombok.Data;

@Entity
@Table(name = "reports")
@Builder
@Data
public class Report {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	private String name;

	@Column(name = "createdAt", nullable = false, updatable = false)
	@CreationTimestamp
	private Date createdAt;
}