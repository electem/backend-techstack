package com.example.onetoonemapping.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.onetoonemapping.models.Student;

@Repository
public interface StudentRepository extends CrudRepository<Student, Integer> {
}