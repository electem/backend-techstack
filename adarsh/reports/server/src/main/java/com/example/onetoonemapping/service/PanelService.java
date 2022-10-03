package com.example.onetoonemapping.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.onetoonemapping.models.Panel;
import com.example.onetoonemapping.repository.PanelRepository;

@Service
public class PanelService {

    @Autowired
    private PanelRepository repository;
    
    public Page<Panel> findPanelsWithPagination(int offset,int pageSize){
        //Page<Panel> panel = repository.findAll(PageRequest.of(offset, pageSize));
    	Panel p =new Panel();
        return  (Page<Panel>) p;
    }
}
