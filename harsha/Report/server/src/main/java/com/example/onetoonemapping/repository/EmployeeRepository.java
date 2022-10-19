package com.example.onetoonemapping.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import com.example.onetoonemapping.models.Employee;

@Repository
public interface EmployeeRepository extends PagingAndSortingRepository<Employee, Integer> {

	@Query(value = "SELECT e.id,e.name,e.age FROM employee e", countQuery = "select count(e.id) as FROM from employee e", nativeQuery = true)
	Page<Employee> findAll(Pageable pageable);
}
