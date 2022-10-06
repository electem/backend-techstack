package com.example.onetoonemapping.models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Entity
@Getter
@Builder
@Table(name = "testData")
public class TestData {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	private String data;

	@JsonBackReference
	@ManyToMany(mappedBy = "testsDatas")
	private List<PanelData> panelDatas;

}
