package com.example.onetoonemapping.repository;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.onetoonemapping.models.Report;
import com.example.onetoonemapping.models.ReportPanelTests;

@Repository
public interface ReportRepository extends CrudRepository<Report, Integer> {

	@Query(value = "insert into report_panel_tests (data , reportId, panelId ,testId) values (?1 , ?2, ?3 ,?4)", nativeQuery = true)
	ReportPanelTests createReportPanelTests(@Param("data") String data,
			@Param("reportId") Integer reportId, @Param("panelId") Integer panelId, @Param("testId") Integer testId);

	@Query(value="select * from report_panel_tests ",nativeQuery=true)
	List<Object[]> getReportPanelTests();

	@Query(value="SELECT * FROM reports r join report_panel_tests rpt on r.id=rpt.reportid",nativeQuery=true)
	List<Report> getReports();
	
	@Query(value = "SELECT * FROM reports r where r.id=?1", nativeQuery = true)
	List<Report> findByReportId(Integer id);
}
