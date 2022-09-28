package com.example.onetoonemapping.models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "testData")
public class TestData {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	private String data;

	@JsonBackReference
	@ManyToMany(mappedBy = "testsDatas")
	private List<PanelData> panelDatas;

	public TestData() {

	}

	public TestData(int id, String data, List<PanelData> panelDatas) {
		super();
		this.id = id;
		this.data = data;
		this.panelDatas = panelDatas;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public List<PanelData> getPanelDatas() {
		return panelDatas;
	}

	public void setPanelDatas(List<PanelData> panelDatas) {
		this.panelDatas = panelDatas;
	}

}
