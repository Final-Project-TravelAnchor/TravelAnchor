package travelanchor_server.travelplan.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import travelanchor_server.common.ResponseDTO;
import travelanchor_server.member.dto.MemberDTO;
import travelanchor_server.travelplan.dto.TravelDayDTO;
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

    @Operation(summary = "여행 일정 부분 조회 요청", description = "여행 일정 부분 조회 처리가 진행됩니다.", tags = { "TravelPlanController" })
    @GetMapping("/travel-plan/{travelCode}")
    public ResponseEntity<ResponseDTO> findTravelPlanDetail(@PathVariable int travelCode) {

        log.info("[TravelPlanController] findTravelPlanDetail Start");

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "부분 정보 조회 성공", travelPlanService.findTravelPlanDetail(travelCode)));
    }

    @Operation(summary = "여행일정 등록 요청", description = "해당 여행 일정 등록이 진행됩니다.", tags = { "TravelPlanController" })
    @PostMapping("/travel-plan")
    public ResponseEntity<ResponseDTO> insertTravelPlan(@RequestBody TravelPlanDTO travelPlanDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "여행일정 등록 성공", travelPlanService.insertTravelPlan(travelPlanDTO)));
    }

    @Operation(summary = "여행일정 수정 요청", description = "해당 여행일정 수정이 진행됩니다.", tags = { "TravelPlanController" })
    @PutMapping("/travel-plan/{travelCode}")
    public ResponseEntity<ResponseDTO> updateTravelPlan(@PathVariable int travelCode , @RequestBody TravelPlanDTO travelPlanDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "여행일정 수정 성공", travelPlanService.updateTravelPlan(travelCode, travelPlanDTO)));
    }

    // 삭제라고 하지만 travelIsdeleted 가 Y 또는 N으로 수정되는 거임 ~.~
    @Operation(summary = "여행일정 삭제 요청", description = "해당 여행일정 삭제가 진행됩니다.", tags = { "TravelPlanController" })
    @PutMapping("/travel-plan/del/{travelCode}")
    public ResponseEntity<ResponseDTO> deleteTravelPlan(@PathVariable int travelCode , @RequestBody TravelPlanDTO travelPlanDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "여행일정 삭제 성공", travelPlanService.deleteTravelPlan(travelCode, travelPlanDTO)));
    }

    @Operation(summary = "여행 일자별 일정 삭제 요청", description = "해당 여행 일자별 일정 삭제가 진행됩니다.", tags = { "TravelPlanController" })
    @DeleteMapping("/travel-plan/day-del/{dayCode}")
    public ResponseEntity<ResponseDTO> deleteTravelDayPlan(@PathVariable int dayCode, @RequestBody MemberDTO memberDTO) {
        return ResponseEntity.ok().body( new ResponseDTO(HttpStatus.OK, "여행 일자별 일정 삭제 성공",
        travelPlanService.deleteTravelDayPlan(dayCode, memberDTO)));
    }

    @Operation(summary = "여행 세부 일정 삭제 요청", description = "해당 여행 세부 일정 삭제가 진행됩니다.", tags = { "TravelPlanController" })
    @DeleteMapping("/travel-plan/act-del/{activityCode}")
    public ResponseEntity<ResponseDTO> deleteTravelActivityPlan(@PathVariable int activityCode, @RequestBody MemberDTO memberDTO) {
        return ResponseEntity.ok().body( new ResponseDTO(HttpStatus.OK, "여행 세부 일정 삭제 성공",
                travelPlanService.deleteTravelActivityPlan(activityCode, memberDTO)));
    }


}
