package com.example.onetoonemapping.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.onetoonemapping.models.Product;

@Repository
public interface ProductRepository extends CrudRepository<Product, Integer> {

}
