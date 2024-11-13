package travelanchor_server.travelplan.controller;

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

}
