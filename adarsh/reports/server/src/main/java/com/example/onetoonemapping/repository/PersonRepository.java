package com.example.onetoonemapping.repository;

import org.springframework.data.repository.CrudRepository;

import com.example.onetoonemapping.models.Person;



public interface PersonRepository extends CrudRepository<Person, Integer>{

	Person findByEmail(String email);

}
