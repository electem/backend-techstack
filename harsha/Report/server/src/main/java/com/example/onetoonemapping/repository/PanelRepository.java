package com.example.onetoonemapping.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.onetoonemapping.models.Panel;

@Repository
public interface PanelRepository extends CrudRepository<Panel, Integer> {

	@Query(value = "SELECT * FROM panels p where p.id=?1", nativeQuery = true)
	List<Panel> findByPanelId(Integer id);
}
