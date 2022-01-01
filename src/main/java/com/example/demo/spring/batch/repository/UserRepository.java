/**
 * 
 */
package com.example.demo.spring.batch.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.spring.batch.model.User;


/**
 * @author Cybertech1
 *
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long>{

}
