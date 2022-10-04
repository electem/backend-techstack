package com.example.onetoonemapping.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.onetoonemapping.models.Tests;

@Repository
public interface TestRepository extends CrudRepository<Tests, Integer> {

}

