package com.example.manytomanymapping.repository;

import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.manytomanymapping.models.File;

@Transactional
@Repository
public interface FileRepository extends JpaRepository<File, String> {

	@Query(value = "select * from files f where f.file_name= :fileName", nativeQuery = true)
	File getByFileName(@Param(value = "fileName") String fileName);
}
