package com.example.onetoonemapping.models;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "panelDatas")
public class PanelData {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int panelDataId;

	private String panelDataName;

	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "panelData_testsData", joinColumns = {
			@JoinColumn(name = "panelData_id") }, inverseJoinColumns = { @JoinColumn(name = "testsData_id") })
	private List<TestData> testsDatas;
}