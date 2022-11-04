package com.example.onetoonemapping.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.onetoonemapping.models.Department;

@Repository
public interface DepermentRepository extends CrudRepository<Department, Integer> {

}
