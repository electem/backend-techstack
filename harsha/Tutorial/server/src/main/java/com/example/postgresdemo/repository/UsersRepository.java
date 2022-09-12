package com.example.postgresdemo.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.postgresdemo.model.Users;

public interface UsersRepository extends CrudRepository<Users, Integer> {

}
