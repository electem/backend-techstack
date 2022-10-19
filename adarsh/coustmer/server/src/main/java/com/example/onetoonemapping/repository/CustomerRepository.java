package com.example.onetoonemapping.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.onetoonemapping.models.Customar;

@Repository
public interface CustomerRepository extends CrudRepository<Customar, Integer> {

}