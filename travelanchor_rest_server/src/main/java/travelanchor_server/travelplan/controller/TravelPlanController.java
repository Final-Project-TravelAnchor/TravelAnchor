package travelanchor_server.travelplan.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import travelanchor_server.common.ResponseDTO;
import travelanchor_server.population.dto.PopulationDTO;
import travelanchor_server.travelplan.dto.TravelPlanDTO;
import travelanchor_server.travelplan.service.TravelPlanService;

@RestController
@RequestMapping("/travel-plan/v1")
public class TravelPlanController {

    private static final Logger log = LoggerFactory.getLogger(TravelPlanController.class);

    private final TravelPlanService travelPlanService;

    @Autowired
    public TravelPlanController(TravelPlanService travelPlanService) { this.travelPlanService = travelPlanService; }

    @Operation(summary = "여행 일정 리스트 조회 요청", description = "여행 일정 리스트 조회 처리가 진행됩니다.", tags = { "TravelPlanController" })
    @GetMapping("travel-plan")
    public ResponseEntity<ResponseDTO> findTravelPlanList(){

        log.info("[TravelPlanController] findTravelPlanList Start");

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", travelPlanService.findTravelPlanList()));
    }

    @Operation(summary = "여행 일정 상세 조회 요청", description = "여행 일정 상세 조회 처리가 진행됩니다.", tags = { "TravelPlanController" })
    @GetMapping("/travel-plan/{travelCode}")
    public ResponseEntity<ResponseDTO> findTravelPlanDetail(@PathVariable int travelCode) {

        log.info("[TravelPlanController] findTravelPlanDetail Start");

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "상세정보 조회 성공", travelPlanService.findTravelPlanDetail(travelCode)));
    }

    @Operation(summary = "여행일정 등록 요청", description = "해당 여행 일정 등록이 진행됩니다.", tags = { "TravelPlanController" })
    @PostMapping("/travel-plan")
    public ResponseEntity<ResponseDTO> insertTravelPlan(@RequestBody TravelPlanDTO travelPlanDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "여행일정 등록 성공", travelPlanService.insertTravelPlan(travelPlanDTO)));
    }
//
//    @Operation(summary = "여행일정 수정 요청", description = "해당 여행일정 수정이 진행됩니다.", tags = { "PopulationController" })
//    @PutMapping("/populations")
//    public ResponseEntity<ResponseDTO> updatePopulation(@ModelAttribute PopulationDTO populationDTO) {
//        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "여행일정 수정 성공", populationService.updatePopulation(populationDTO)));
//
//    }

}
