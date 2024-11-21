package travelanchor_server.area.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelanchor_server.area.entity.City;
import travelanchor_server.population.entity.Population;

import java.util.List;

public interface CityRepository extends JpaRepository<City, String> {
    List<City> findAll();

    List<City> findByCountryCode(int countryCode);
}
