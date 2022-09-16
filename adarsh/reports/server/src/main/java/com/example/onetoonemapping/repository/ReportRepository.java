package com.example.onetoonemapping.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.onetoonemapping.models.Report;


@Repository
public interface ReportRepository extends CrudRepository<Report, Integer> {

}