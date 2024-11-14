package travelanchor_server.population.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.websocket.server.PathParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import travelanchor_server.common.Criteria;
import travelanchor_server.common.PagingResponseDTO;
import travelanchor_server.common.ResponseDTO;
import travelanchor_server.population.dto.PopulationDTO;
import travelanchor_server.population.entity.Population;
import travelanchor_server.population.service.PopulationService;

import java.util.List;

@RestController
@RequestMapping("/population/v1")
public class PopulationController {

    private static final Logger log = LoggerFactory.getLogger(PopulationController.class);

    private final PopulationService populationService;

    @Autowired
    public PopulationController(PopulationService populationService) {
        this.populationService = populationService;
    }

    @Operation(summary = "여행메이트 리스트 조회 요청", description = "여행메이트 리스트 조회 처리가 진행됩니다.", tags = { "PopulationController" })
    @GetMapping("/populations")
    public ResponseEntity<ResponseDTO> findPopulationList(){

        log.info("[PopulationController] findPopulationList Start");

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", populationService.findPopulationList()));
    }

    @Operation(summary = "여행메이트 상세 조회 요청", description = "여행메이트 상세 조회 처리가 진행됩니다.", tags = { "PopulationController" })
    @GetMapping("/populations/{populationCode}")
    public ResponseEntity<ResponseDTO> findPopulationDetail(@PathVariable int populationCode) {

        log.info("[PopulationController] findPopulationDetail Start");

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "상세정보 조회 성공", populationService.findPopulationDetail(populationCode)));
    }

    @Operation(summary = "여행메이트 등록 요청", description = "해당 여행메이트 등록이 진행됩니다.", tags = { "PopulationController" })
    @PostMapping("/populations")
    public ResponseEntity<ResponseDTO> insertPopulation(@RequestBody PopulationDTO populationDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "여행메이트 등록 성공", populationService.insertPopulation(populationDTO)));
    }

    @Operation(summary = "여행메이트 수정 요청", description = "해당 여행메이트 수정이 진행됩니다.", tags = { "PopulationController" })
    @PutMapping("/populations")
    public ResponseEntity<ResponseDTO> updatePopulation(@RequestBody PopulationDTO populationDTO) {
        // 수정에서 삭제를 진행할 수 있어야 함.
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "여행메이트 수정 성공", populationService.updatePopulation(populationDTO)));

    }
}
