package com.example.manytomanymapping.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.manytomanymapping.models.Department;

public interface DepartmentRepository extends CrudRepository<Department, Integer> {

}
