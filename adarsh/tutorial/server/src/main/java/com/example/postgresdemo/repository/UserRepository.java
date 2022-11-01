package com.example.postgresdemo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.postgresdemo.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

}
