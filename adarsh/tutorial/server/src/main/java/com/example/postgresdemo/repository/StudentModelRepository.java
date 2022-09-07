package com.example.postgresdemo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.postgresdemo.model.StudentModel;

@Repository
public interface StudentModelRepository extends CrudRepository<StudentModel, Integer> {

}
