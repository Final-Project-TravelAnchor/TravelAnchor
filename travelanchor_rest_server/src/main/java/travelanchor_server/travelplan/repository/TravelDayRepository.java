package travelanchor_server.travelplan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelanchor_server.travelplan.entity.TravelDay;

import java.util.Map;

public interface TravelDayRepository extends JpaRepository<TravelDay, Integer> {

//    void delete(TravelDay travelDay);

//    Map<Object, Object> findByDayCode(int dayCode);
}
