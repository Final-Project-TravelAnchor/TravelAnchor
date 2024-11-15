package travelanchor_server.travelDestination.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelanchor_server.travelDestination.entity.TravelDestination;

public interface TravelDestinationRepository extends JpaRepository<TravelDestination, Integer> {
}
