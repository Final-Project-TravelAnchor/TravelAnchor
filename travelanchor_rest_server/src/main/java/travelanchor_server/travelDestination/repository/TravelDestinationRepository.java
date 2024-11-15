package travelanchor_server.travelDestination.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelanchor_server.travelDestination.entity.TravelDestination;

import java.util.List;

public interface TravelDestinationRepository extends JpaRepository<TravelDestination, Integer> {

    List<TravelDestination> findById(int memberCode);
}
