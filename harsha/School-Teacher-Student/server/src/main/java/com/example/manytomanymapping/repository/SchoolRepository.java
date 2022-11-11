package com.example.manytomanymapping.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.manytomanymapping.models.School;

public interface SchoolRepository extends CrudRepository<School, Integer> {
}