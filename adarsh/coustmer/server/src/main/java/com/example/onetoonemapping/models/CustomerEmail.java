package com.example.onetoonemapping.models;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerEmail {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String data1;
	private String data2;
	private String data3;
	private String data4;
}
