package com.example.manytomanymapping.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.manytomanymapping.models.Student;

@Repository
public interface StudentRepository extends CrudRepository<Student, Integer> {
}