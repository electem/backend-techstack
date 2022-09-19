package com.example.onetoonemapping.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.onetoonemapping.models.Report;


@Repository
public interface ReportRepository extends CrudRepository<Report, Integer> {

	@Query(value = "insert into report_panel_tests (data , reportID, panelID ,testID) values (?1 , ?2, ?3 ,?4)", nativeQuery = true)
	void createReportPanelTests(@Param("data") String data, @Param("reportID") Integer reportId,
			@Param("panelID") Integer panelId, @Param("testID") Integer testId);

	@Query(value = "select * from report_panel_tests ", nativeQuery = true)
	List<Object[]> getReportPanelTests();

}