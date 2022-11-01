package com.example.onetoonemapping.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.onetoonemapping.models.CustomerGroup;

public interface CustomerGroupRepository extends CrudRepository<CustomerGroup, Integer> {

	@Query(value = "select * from email_data ed where ed.email=?1", nativeQuery = true)
	 List<Object[]> getEmailData(String email);
}
