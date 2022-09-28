package com.example.onetoonemapping.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.onetoonemapping.models.Panel;

@Repository
public interface PanelRepository extends CrudRepository<Panel, Integer> {

//	Page<Panel> findAll(PageRequest of);

}
