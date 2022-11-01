package com.example.onetoonemapping.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.onetoonemapping.models.CustomerGroup;

@Repository
public interface CustomerGroupRepository extends CrudRepository<CustomerGroup, Integer> {

	@Query(value = "select * from customer_email cm where cm.email=?1", nativeQuery = true)
	List<Object[]> getCustomars(String name);
}