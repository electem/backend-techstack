package com.example.postgresdemo.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.web.bind.annotation.CrossOrigin;

@Entity
@Table(name = "comments")
@CrossOrigin
public class Comment {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	private String commentDescription;

	@Column(name = "createdAt", nullable = false, updatable = false)
	@CreationTimestamp
	private Date createdAt;

	
	private Integer tutorialId;

	public Comment() {
	}

	public Comment(int id, String commentDescription, Date createdAt, Integer tutorialId) {
		this.id = id;
		this.commentDescription = commentDescription;
		this.createdAt = createdAt;
		this.tutorialId = tutorialId;
	}
	
	public Comment(String commentDescription, Integer tutorialId) {
		this.commentDescription = commentDescription;
		this.tutorialId = tutorialId;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCommentDescription() {
		return commentDescription;
	}

	public void setCommentDescription(String commentDescription) {
		this.commentDescription = commentDescription;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Integer getTutorialId() {
		return tutorialId;
	}

	public void setTutorialId(Integer tutorialId) {
		this.tutorialId = tutorialId;
	}
}
