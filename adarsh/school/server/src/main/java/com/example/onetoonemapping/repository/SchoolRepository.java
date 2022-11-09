package com.example.onetoonemapping.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.onetoonemapping.models.School;

@Repository
public interface SchoolRepository extends CrudRepository<School, Integer> {
}
