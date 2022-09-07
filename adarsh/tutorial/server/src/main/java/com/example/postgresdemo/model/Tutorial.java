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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.web.bind.annotation.CrossOrigin;


//this is the entity class
@Entity
@Table(name = "tutorials")
@CrossOrigin
public class Tutorial {
	// this are the fildes of entity class
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@NotBlank
	private String title;

	private String description;

	private String timeZone;

	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "creatDate", nullable = false, updatable = false)
	private Date creatDate;
	// manytomany association with category object
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "tutorials_categories", joinColumns = {
			@JoinColumn(name = "tutorials_id") }, inverseJoinColumns = { @JoinColumn(name = "categories_id") })
	private List<Category> categories;

	// empty constructor
	public Tutorial() {
	}

	// constructor to initialize the fields
	public Tutorial(int id, String title, String description, String timeZone, Date creatDate,
			List<Category> categories, List<Comment> comments) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.timeZone = timeZone;
		this.creatDate = creatDate;
		this.categories = categories;
	}

	// getter and setter for the fields
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

	public String getTimeZone() {
		return timeZone;
	}

	public void setTimeZone(String timeZone) {
		this.timeZone = timeZone;
	}

	public Date getCreatDate() {
		return creatDate;
	}

	public void setCreatDate(Date creatDate) {
		this.creatDate = creatDate;
	}

	public List<Category> getCategories() {
		return categories;
	}

	public void setCategories(List<Category> categories) {
		this.categories = categories;
	}
}
