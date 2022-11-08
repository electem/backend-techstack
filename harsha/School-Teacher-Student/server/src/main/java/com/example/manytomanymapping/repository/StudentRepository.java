package com.example.manytomanymapping.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.manytomanymapping.models.Student;

public interface StudentRepository extends CrudRepository<Student, Integer> {
}