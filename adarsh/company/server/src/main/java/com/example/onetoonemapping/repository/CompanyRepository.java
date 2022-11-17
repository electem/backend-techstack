package com.example.onetoonemapping.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.onetoonemapping.models.Company;

@Repository
public interface CompanyRepository extends CrudRepository<Company, Integer> {

}