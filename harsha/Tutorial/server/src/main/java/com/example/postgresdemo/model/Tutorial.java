package com.example.postgresdemo.model;

import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.web.bind.annotation.CrossOrigin;

@Entity
@Table(name = "tutorials")
@CrossOrigin
public class Tutorial {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@NotBlank
	private String title;

	private String description;

	private String timezone;

	@Column(name = "createdAt", nullable = false, updatable = false)
	@CreationTimestamp
	private Date createdAt;

	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "tutorials_categories", joinColumns = {
			@JoinColumn(name = "tutorials_id") }, inverseJoinColumns = { @JoinColumn(name = "categories_id") })
	private List<Category> categories;

	public Tutorial() {
	}

	public Tutorial(int id, String title, String description, String timezone, Date createdAt,
			List<Category> categories) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.timezone = timezone;
		this.createdAt = createdAt;
		this.categories = categories;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTimezone() {
		return timezone;
	}

	public void setTimezone(String timezone) {
		this.timezone = timezone;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public List<Category> getCategories() {
		return categories;
	}

	public void setCategories(List<Category> categories) {
		this.categories = categories;
	}
}
