package com.example.postgresdemo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.postgresdemo.model.Tutorial;

@Repository
public interface TutorialRepository extends CrudRepository<Tutorial, Integer>{

}
