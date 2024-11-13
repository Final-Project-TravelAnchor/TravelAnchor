package travelanchor_server.travelplan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelanchor_server.travelplan.entity.TravelPlan;

import java.util.List;

public interface TravelPlanRepository extends JpaRepository<TravelPlan, Integer> {
    List<TravelPlan> findAll();
}
