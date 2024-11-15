package travelanchor_server.restaurant.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import travelanchor_server.member.repository.MemberRepository;
import travelanchor_server.restaurant.dto.RestaurantDTO;
import travelanchor_server.restaurant.entity.Restaurant;
import travelanchor_server.restaurant.repository.RestaurantRepository;

import java.util.List;

@Service
public class RestaurantService {

    private static final Logger log = LoggerFactory.getLogger(RestaurantService.class);

    private final RestaurantRepository restaurantRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public RestaurantService(RestaurantRepository restaurantRepository, ModelMapper modelMapper) {
        this.restaurantRepository = restaurantRepository;
        this.modelMapper = modelMapper;
    }

    @Transactional
    public Object insertRestaurant(RestaurantDTO restaurantDTO) {

        log.info("[RestaurantService] insertRestaurant() Start");
        log.info("[RestaurantService] restaurantDTO : ", restaurantDTO);

        int result = 0;

        try {
            Restaurant insertRestaurant = modelMapper.map(restaurantDTO, Restaurant.class);

            restaurantRepository.save(insertRestaurant);

            result = 1;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        log.info("[RestaurantService] insertRestaurant() End");

        return (result > 0) ? "맛집 저장 성공" : "맛집 저장 실패";
    }

    public Object getSavedRestaurantList(int memberCode) {

        log.info("[RestaurantService] getSavedRestaurantList() Start");

        List<Restaurant> restaurantList = restaurantRepository.findById(memberCode);

        log.info("[RestaurantService] savedRestaurantList {}", restaurantList);

        log.info("[RestaurantService] getSavedRestaurantList() End");

        return restaurantList.stream().map(restaurant -> modelMapper.map(restaurant, RestaurantDTO.class));
    }

    @Transactional
    public Object deleteSavedRestaurant(RestaurantDTO restaurantDTO, int favoriteCode) {

        log.info("[RestaurantService] deleteSavedRestaurant() Start");

        log.info("[RestaurantService] restaurantDTO : ", restaurantDTO);

        int result = 0;

        try {
            // favoriteCode를 조건으로 레코드 삭제
            Restaurant deleteSavedRestaurant = modelMapper.map(restaurantDTO, Restaurant.class);

            restaurantRepository.delete(deleteSavedRestaurant);

            restaurantRepository.deleteByFavoriteCode(favoriteCode);

            result = 1;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        log.info("[RestaurantService] deleteSavedRestaurant() End");

        return (result > 0) ? "저장한 맛집 삭제 성공" : "저장한 맛집 삭제 실패";
    }
}
