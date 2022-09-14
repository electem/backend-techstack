package com.example.onetoonemapping.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.onetoonemapping.models.Panel;

@Repository
public interface PanelRepository extends CrudRepository<Panel, Integer> {

}
