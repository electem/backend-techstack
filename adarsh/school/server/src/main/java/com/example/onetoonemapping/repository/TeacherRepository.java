package com.example.onetoonemapping.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.onetoonemapping.models.Teachers;

@Repository
public interface TeacherRepository extends CrudRepository<Teachers, Integer> {
}