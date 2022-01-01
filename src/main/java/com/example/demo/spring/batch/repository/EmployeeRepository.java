package com.example.demo.spring.batch.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.spring.batch.model.Employee;

@Repository
public interface EmployeeRepository  extends JpaRepository<Employee, Long>{

}
