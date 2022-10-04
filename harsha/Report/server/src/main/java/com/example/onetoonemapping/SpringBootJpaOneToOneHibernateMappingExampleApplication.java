package com.example.onetoonemapping;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.example.onetoonemapping.models.Product;

@SpringBootApplication
public class SpringBootJpaOneToOneHibernateMappingExampleApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootJpaOneToOneHibernateMappingExampleApplication.class, args);

		ArrayList<Product> productList = new ArrayList<Product>();
		Product product = new Product(1, "mi", "mobile", 10000);
		Product product1 = new Product(2, "sony", "mobile", 20000);
		productList.add(product);
		productList.add(product1);
		System.out.println("list 1 =" + productList);

		ArrayList<Product> productList2 = new ArrayList<Product>();
		Product product2 = new Product(1, "mi", "mobile", 10000);
		Product product3 = new Product(2, "sony", "mobile", 20000);
		productList2.add(product2);
		productList2.add(product3);
		System.out.println("list 2 =" + productList2);
		ArrayList<Product> productList3 = new ArrayList<Product>();
		for (Product prod : productList) {
			if (productList2.contains(prod)) {
				productList3.add(prod);
			}
		}
			System.out.println("Common elements:"+ productList3);

		productList3.retainAll(productList2);
		System.out
				.println("lilst =" + productList.stream().filter(productList2::contains).collect(Collectors.toList()));

		System.out.println("Before " + productList.size());
		productList.removeAll(productList);
		Product product21 = new Product(2, "sony", "mobile", 20000);
		System.out.println(productList.contains(product1));
		System.out.println("After " + productList.size());

		Set<String> hashSet = new HashSet<String>();
		hashSet.add("hello");
		hashSet.add("For");
		hashSet.add("good");
		hashSet.add("hello");
		System.out.println(hashSet);

		Map<String, String> map = new HashMap<String, String>();
		map.put("name", "raj");
		map.put("name", "1");
		map.put("name", "sun");
		System.out.println(map.get("name"));
	}
}
