package com.example.onetoonemapping.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.onetoonemapping.models.Test;

@Repository
public interface TestRepository extends CrudRepository<Test, Integer> {

}
