package com.example.postgresdemo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.postgresdemo.model.Subject;

@Repository
public interface SubjectRepository extends CrudRepository<Subject, Integer>{

}
