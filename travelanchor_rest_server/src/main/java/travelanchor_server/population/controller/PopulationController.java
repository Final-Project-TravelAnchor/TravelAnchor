package travelanchor_server.population.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import travelanchor_server.common.ResponseDTO;
import travelanchor_server.population.dto.PopulationDTO;
import travelanchor_server.population.service.PopulationService;

@RestController
@RequestMapping("/api/v1")
public class PopulationController {

    private static final Logger log = LoggerFactory.getLogger(PopulationController.class);

    private final PopulationService populationService;

    @Autowired
    public PopulationController(PopulationService populationService) {
        this.populationService = populationService;
    }

    @Operation(summary = "여행메이트 리스트 조회 요청", description = "여행메이트 리스트 조회 처리가 진행됩니다.", tags = { "PopulationController" })
    @GetMapping("/items/population")
    public ResponseEntity<PopulationDTO> selectPopulationList()
    {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공",  populationService.selectPopulationList()));
    }
}
