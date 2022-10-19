package com.example.onetoonemapping.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.onetoonemapping.models.Tests;

@Repository
public interface TestsRepository extends CrudRepository<Tests, Integer> {
}
