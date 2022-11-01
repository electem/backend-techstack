package com.example.onetoonemapping.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.onetoonemapping.models.Person;

@Repository
public interface PersonRepository extends CrudRepository<Person, Integer>{

	Person findByEmail(String email);

}
