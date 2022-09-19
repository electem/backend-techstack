//package com.example.onetoonemapping.repository;
//
//import org.springframework.data.jpa.repository.Modifying;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.CrudRepository;
//import org.springframework.stereotype.Repository;
//
//import com.example.onetoonemapping.models.ReportPanelTest;
//
//@Repository
//public interface ReportTestPanelRepository extends CrudRepository<ReportPanelTest, Integer> {
//	 @Modifying
//	   @Query(value = "insert into reporttestpanels(id, data,testid,reportid,panelid) VALUES (?1, ?2,?3,?4,?5)", nativeQuery = true)
//	   void insertIntoFruitsTable(long id, String name,int testid,int reportid,int panelid);
//
//}
//
