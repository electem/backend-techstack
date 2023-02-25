package com.example.onetoonemapping.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import com.example.onetoonemapping.models.Panel;

@Repository
public interface PanelRepository extends PagingAndSortingRepository<Panel, Integer> {

	Panel findByName(String name);
}
