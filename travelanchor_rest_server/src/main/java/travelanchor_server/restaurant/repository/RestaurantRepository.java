package travelanchor_server.restaurant.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelanchor_server.restaurant.entity.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> {
}
