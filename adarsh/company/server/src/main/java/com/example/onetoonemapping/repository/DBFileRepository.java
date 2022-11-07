/**
 * 
 */
package com.example.onetoonemapping.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.onetoonemapping.models.DBFile;

/**
 * @author Cybertech1
 *
 */
@Repository
public interface DBFileRepository extends JpaRepository<DBFile, String> {

	@Query(value = "select * from files f where f.file_name= :filName", nativeQuery = true)
	DBFile getByFileName(@Param(value = "filName") String filName);

}
