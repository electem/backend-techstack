package com.example.postgresdemo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.postgresdemo.model.Tutorial;


//this is the repository class
@Repository
public interface TutorialRepository extends CrudRepository<Tutorial, Integer> {
}
