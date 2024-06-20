/**
 * 
 */
package com.example.collection.exp;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import com.example.collection.exp.model.Product;

import lombok.extern.slf4j.Slf4j;

/**
 * @author elect
 *
 */
@Slf4j
public class JavaStreamExample {

	private static List<Product> productsList = new ArrayList<>();

	public static void main(final String[] args) {
		// Adding Products
		productsList.add(new Product(1, "HP Laptop", 25000f));
		productsList.add(new Product(2, "Dell Laptop", 30000f));
		productsList.add(new Product(3, "Lenevo Laptop", 28000f));
		productsList.add(new Product(4, "Sony Laptop", 28000f));
		productsList.add(new Product(5, "Apple Laptop", 90000f));
		// With Java 8 Stream API'S
		withStreamAPI();
		sumByUsingCollectorsMethods();
		findMaxAndMinMethods();
		convertListToMap();
		ConvertListToSet();
	}

	// filtering price 25000
	private static void withStreamAPI() {
		// filtering data of list
		List<Float> productPriceList = productsList.stream().filter((product) -> product.getPrice() > 25000)
				.map((product) -> product.getPrice()).collect(Collectors.toList());
		// displaying data
		productPriceList.forEach((price) -> log.info("product prices" + price));
	}

	// calculating the sum of price
	private static void sumByUsingCollectorsMethods() {
		double totalPrice3 = productsList.stream().collect(Collectors.summingDouble(product -> product.getPrice()));
		log.info("total price of product " + totalPrice3);
	}

	// finding maximum and minimum
	private static void findMaxAndMinMethods() {
		// max() method to get max Product price
		Product productA = productsList.stream()
				.max((product1, product2) -> product1.getPrice() > product2.getPrice() ? 1 : -1).get();
		log.info("maximum price " + productA);
		// min() method to get min Product price
		Product productB = productsList.stream()
				.max((product1, product2) -> product1.getPrice() < product2.getPrice() ? 1 : -1).get();
		log.info("maximum product price " + productB);
	}

	// Convert List into map
	private static void convertListToMap() {
		Map<Integer, String> productPriceMap = productsList.stream()
				.collect(Collectors.toMap(p -> p.getId(), p -> p.getName()));
		log.info("map" + productPriceMap);
	}

	// Converting product List into Set
	private static void ConvertListToSet() {
		Set<Float> productPriceList = productsList.stream().filter(product -> product.getPrice() < 30000)
				.map(product -> product.getPrice()).collect(Collectors.toSet());
		log.info("converting list to set" + productPriceList);
	}
}
