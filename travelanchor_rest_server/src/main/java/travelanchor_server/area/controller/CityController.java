package travelanchor_server.area.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import travelanchor_server.area.service.CityService;
import travelanchor_server.common.ResponseDTO;

@RestController
@RequestMapping("/city/v1")
public class CityController {

    private static final Logger log = LoggerFactory.getLogger(CityController.class);

    private final CityService cityService;

    @Autowired
    public CityController(CityService cityService) { this.cityService = cityService; }

    @Operation(summary = "전체 도시 조회", description = "전체 도시 찾기", tags = {"CityController"})
    @GetMapping("/city")
    public ResponseEntity<ResponseDTO> findCity() {

        log.info("도시컨트롤러: 전체도시조회");

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", cityService.findCity()));
    }

}
