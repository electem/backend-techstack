package com.example.onetoonemapping.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.onetoonemapping.models.PanelData;

@Repository
public interface PanelDataRepository extends CrudRepository<PanelData, Integer> {

}