package com.example.collection.exp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.collection.exp.model.Company;



@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

}
