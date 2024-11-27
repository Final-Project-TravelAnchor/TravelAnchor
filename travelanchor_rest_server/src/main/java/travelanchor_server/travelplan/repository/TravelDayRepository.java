package travelanchor_server.travelplan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import travelanchor_server.travelplan.entity.TravelDay;

import java.util.Map;

public interface TravelDayRepository extends JpaRepository<TravelDay, Integer> {

    @Query("SELECT MAX(d.dayCode) FROM TravelDay d")
    int maxDayCode();

//    void delete(TravelDay travelDay);

//    Map<Object, Object> findByDayCode(int dayCode);
}
