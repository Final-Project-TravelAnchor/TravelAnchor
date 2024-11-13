package travelanchor_server.travelreport.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelanchor_server.travelreport.entity.TravelReport;

import java.util.List;

public interface TravelReportRepository extends JpaRepository<TravelReport, Integer> {
    List<TravelReport> findAll();
}
