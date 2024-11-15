package travelanchor_server.area.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelanchor_server.area.entity.Country;

import java.util.List;

public interface CountryRepository extends JpaRepository<Country, Integer> {
    List<Country> findAll();
}
