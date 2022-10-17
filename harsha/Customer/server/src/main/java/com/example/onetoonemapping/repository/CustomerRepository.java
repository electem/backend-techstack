package com.example.onetoonemapping.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.onetoonemapping.models.Customer;

public interface CustomerRepository extends CrudRepository<Customer, Integer> {

}
