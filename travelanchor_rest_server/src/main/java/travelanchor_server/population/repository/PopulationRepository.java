package travelanchor_server.population.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelanchor_server.population.entity.Population;

import java.util.List;

public interface PopulationRepository extends JpaRepository<Population, Integer>{

    List<Population> findAll();
}
