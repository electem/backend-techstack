package com.example.onetoonemapping.controller;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.onetoonemapping.models.Product;
import com.example.onetoonemapping.repository.ProductRepository;

@RestController
@CrossOrigin
public class ProductController {

	@Autowired
	ProductRepository productRepository;

	@PostMapping("/createProduct")
	public Product createProduct(@Valid @RequestBody Product product) {

		return productRepository.save(product);
	}
}