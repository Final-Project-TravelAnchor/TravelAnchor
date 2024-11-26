package travelanchor_server.travelplan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import travelanchor_server.travelplan.entity.TravelPlan;

import java.util.List;

public interface TravelPlanRepository extends JpaRepository<TravelPlan, Integer> {

    @Query("SELECT MAX(t.travelCode) FROM TravelPlan t")
    int maxTravelCode();
//    List<TravelPlan> findAll();
}
