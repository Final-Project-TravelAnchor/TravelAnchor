package travelanchor_server.restaurant.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import travelanchor_server.common.ResponseDTO;
import travelanchor_server.restaurant.dto.RestaurantDTO;
import travelanchor_server.restaurant.service.RestaurantService;

import java.io.IOException;

@RestController
@RequestMapping("/restaurant/v1")
public class RestaurantController {

    private final RestaurantService restaurantService;

    @Autowired
    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @Operation(summary = "맛집 저장 요청", description = "맛집 저장이 진행됩니다.", tags = { "RestaurantController" })
    @PostMapping("/restaurants")
    public ResponseEntity<ResponseDTO> insertRestaurant(@RequestBody RestaurantDTO restaurantDTO) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "맛집 저장 성공", restaurantService.insertRestaurant(restaurantDTO)));
    }

    @Operation(summary = "회원 맛집 저장 리스트 조회 요청", description = "해당 회원의 저장한 맛집에 대한 리스트 조회가 진행됩니다.", tags = { "RestaurantController" })
    @GetMapping("/restaurants/{memberCode}")
    public ResponseEntity<ResponseDTO> getSavedRestaurantList(@PathVariable int memberCode) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "저장한 맛집 리스트 조회 성공", restaurantService.getSavedRestaurantList(memberCode)));
    }

    @Operation(summary = "저장한 맛집 삭제 요청", description = "저장한 맛집에 대한 삭제가 진행됩니다.", tags = { "RestaurantController" })
    @DeleteMapping("/restaurants/{favoriteCode}")
    public ResponseEntity<ResponseDTO> deleteSavedRestaurant(@RequestBody RestaurantDTO restaurantDTO, @PathVariable int favoriteCode) throws IOException {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "저장한 맛집 삭제 성공", restaurantService.deleteSavedRestaurant(restaurantDTO, favoriteCode)));
    }
}
