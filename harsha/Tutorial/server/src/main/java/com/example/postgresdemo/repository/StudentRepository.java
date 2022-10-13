package com.example.postgresdemo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.postgresdemo.model.Student;

@Repository
public interface StudentRepository extends CrudRepository<Student, Integer> {

}
