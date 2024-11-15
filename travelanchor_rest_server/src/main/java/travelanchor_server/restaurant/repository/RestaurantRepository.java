package travelanchor_server.restaurant.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelanchor_server.restaurant.entity.Restaurant;

import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> {

    List<Restaurant> findById(int memberCode);

    void deleteByFavoriteCode(int favoriteCode);
}
