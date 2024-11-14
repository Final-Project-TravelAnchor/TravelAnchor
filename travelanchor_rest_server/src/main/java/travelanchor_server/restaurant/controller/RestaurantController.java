package travelanchor_server.restaurant.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import travelanchor_server.common.ResponseDTO;
import travelanchor_server.restaurant.dto.RestaurantDTO;
import travelanchor_server.restaurant.service.RestaurantService;

@RestController
@RequestMapping("/restaurant/v1")
public class RestaurantController {

    private static final Logger log = LoggerFactory.getLogger(RestaurantController.class);

    private final RestaurantService restaurantService;

    @Autowired
    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @Operation(summary = "맛집 저장 요청", description = "해당 맛집 저장이 진행됩니다.", tags = { "RestaurantController" })
    @PostMapping("/restaurants")
    public ResponseEntity<ResponseDTO> insertPopulation(@RequestBody RestaurantDTO restaurantDTO) {
        System.out.println("restaurantDTO = " + restaurantDTO);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "맛집 저장 성공", restaurantService.insertRestaurant(restaurantDTO)));
    }
}
