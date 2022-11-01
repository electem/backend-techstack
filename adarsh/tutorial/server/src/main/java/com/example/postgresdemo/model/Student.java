package com.example.postgresdemo.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "students")
public class Student {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	@NotBlank(message = "Name is mandatory")
	private String name;
	
	@NotBlank(message = "Adress is mandatory")
	private String address;
	
	private long phoneNo;
	
	//@NotBlank(message = "Joining Date is mandatory")
	private Date joining_date;

	public Student() {
	}

	public Student(String name, String address, long phoneNo, Date joining_date) {
		this.name = name;
		this.address = address;
		this.phoneNo = phoneNo;
		this.joining_date = joining_date;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public long getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(long phoneNo) {
		this.phoneNo = phoneNo;
	}

	public Date getJoining_date() {
		return joining_date;
	}

	public void setJoining_date(Date joining_date) {
		this.joining_date = joining_date;
	}

	@Override
	public String toString() {
		return "Student [id=" + id + ", name=" + name + ", address=" + address + ", phoneNo=" + phoneNo
				+ ", joining_date=" + joining_date + "]";
	}
}
