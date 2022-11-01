package com.example.postgresdemo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.postgresdemo.model.Users;

@Repository
public interface UsersRepository extends CrudRepository<Users, Integer> {

	Users findOneByUsername(String userName);

}
