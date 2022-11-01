package com.example.manytomanymapping.repository;

import org.springframework.data.repository.CrudRepository;

import com.example.manytomanymapping.models.Company;

public interface CompanyRepository extends CrudRepository<Company, Integer> {

}
