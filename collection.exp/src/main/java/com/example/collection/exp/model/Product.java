/**
 * 
 */
package com.example.collection.exp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author elect
 *
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
	private int id;
    private String name;
    private float price;
}
