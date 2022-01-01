package com.example.postgresdemo.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.postgresdemo.model.DBFile;
/**
 * @author Cybertech1
 *
 */
@Repository
public interface DBFileRepository extends JpaRepository<DBFile, String>  {

}
