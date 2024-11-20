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
import travelanchor_server.travelplan.dto.*;
import travelanchor_server.travelplan.service.TravelPlanService;

@RestController
@RequestMapping("/travel-plan/v1")
public class TravelPlanController {

    private static final Logger log = LoggerFactory.getLogger(TravelPlanController.class);

    private final TravelPlanService travelPlanService;

    // 여행 일정

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

    @Operation(summary = "여행 일정 등록 요청", description = "해당 여행 일정 등록이 진행됩니다.", tags = { "TravelPlanController" })
    @PostMapping("/travel-plan")
    public ResponseEntity<ResponseDTO> insertTravelPlan(@RequestBody TravelPlanDTO travelPlanDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "여행 일정 등록 성공", travelPlanService.insertTravelPlan(travelPlanDTO)));
    }

    @Operation(summary = "여행 일정 수정 요청", description = "해당 여행 일정 수정이 진행됩니다.", tags = { "TravelPlanController" })
    @PutMapping("/travel-plan/{travelCode}")
    public ResponseEntity<ResponseDTO> updateTravelPlan(@PathVariable int travelCode , @RequestBody TravelPlanDTO travelPlanDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "여행 일정 수정 성공", travelPlanService.updateTravelPlan(travelCode, travelPlanDTO)));
    }

    // 삭제라고 하지만 travelIsdeleted 가 Y 또는 N으로 수정되는 거임 ~.~
    @Operation(summary = "여행 일정 삭제 요청", description = "해당 여행 일정 삭제가 진행됩니다.", tags = { "TravelPlanController" })
    @PutMapping("/travel-plan/del/{travelCode}")
    public ResponseEntity<ResponseDTO> deleteTravelPlan(@PathVariable int travelCode , @RequestBody TravelPlanDTO travelPlanDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "여행 일정 삭제 성공", travelPlanService.deleteTravelPlan(travelCode, travelPlanDTO)));
    }

    /*--------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    // 일자별 일정

    @Operation(summary = "여행 일자별 일정 리스트 조회 요청", description = "여행 일자별 일정 리스트 조회 처리가 진행됩니다.", tags = { "TravelPlanController" })
    @GetMapping("travel-plan/day")
    public ResponseEntity<ResponseDTO> findTravelDayPlanList(){
        log.info("[TravelPlanController] findTravelDayPlanList Start");
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK,  "조회 성공", travelPlanService.findTravelDayPlanList()));
    }

    @Operation(summary = "여행 일자별 일정 부분 조회 요청", description = "여행 일자별 일정 부분 조회 처리가 진행됩니다.", tags = { "TravelPlanController" })
    @GetMapping("/travel-plan/day/{dayCode}")
    public ResponseEntity<ResponseDTO> findTravelDayPlanDetail(@PathVariable int dayCode) {
        log.info("[TravelPlanController] findTravelDayPlanDetail Start");
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "부분 정보 조회 성공", travelPlanService.findTravelDayPlanDetail(dayCode)));
    }

    @Operation(summary = "여행 일자별 일정 등록 요청", description = "해당 여행 일자별 일정 등록이 진행됩니다.", tags = { "TravelPlanController" })
    @PostMapping("/travel-plan/day")
    public ResponseEntity<ResponseDTO> insertTravelDayPlan(@RequestBody TravelDayDTO travelDayDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "여행 일자별 일정 등록 성공", travelPlanService.insertTravelDayPlan(travelDayDTO)));
    }

    @Operation(summary = "여행 일자별 일정 수정 요청", description = "해당 여행 일자별 일정 수정이 진행됩니다.", tags = { "TravelPlanController" })
    @PutMapping("/travel-plan/day/{dayCode}")
    public ResponseEntity<ResponseDTO> updateTravelDayPlan(@PathVariable int dayCode , @RequestBody TravelDayDTO travelDayDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "여행 일자별 일정 수정 성공", travelPlanService.updateTravelDayPlan(dayCode, travelDayDTO)));
    }

    @Operation(summary = "여행 일자별 일정 삭제 요청", description = "해당 여행 일자별 일정 삭제가 진행됩니다.", tags = { "TravelPlanController" })
    @DeleteMapping("/travel-plan/day-del/{dayCode}")
    public ResponseEntity<ResponseDTO> deleteTravelDayPlan(@PathVariable int dayCode, @RequestBody MemberDTO memberDTO) {
        return ResponseEntity.ok().body( new ResponseDTO(HttpStatus.OK, "여행 일자별 일정 삭제 성공",
                travelPlanService.deleteTravelDayPlan(dayCode, memberDTO)));
    }



    /*--------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    // 활동정보

    @Operation(summary = "여행 활동별 일정 리스트 조회 요청", description = "여행 활동별 일정 리스트 조회 처리가 진행됩니다.", tags = { "TravelPlanController" })
    @GetMapping("travel-plan/act")
    public ResponseEntity<ResponseDTO> findTravelActivityPlanList(){
        log.info("[TravelPlanController] findTravelActivityPlanList Start");
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK,  "조회 성공", travelPlanService.findTravelActivityPlanList()));
    }

    @Operation(summary = "여행 활동별 일정 부분 조회 요청", description = "여행 활동별 일정 부분 조회 처리가 진행됩니다.", tags = { "TravelPlanController" })
    @GetMapping("/travel-plan/act/{activityCode}")
    public ResponseEntity<ResponseDTO> findTravelActivityPlanDetail(@PathVariable int activityCode) {
        log.info("[TravelPlanController] findTravelActivityPlanDetail Start");
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "부분 정보 조회 성공", travelPlanService.findTravelActivityDetail(activityCode)));
    }

    @Operation(summary = "여행 활동별 일정 등록 요청", description = "해당 여행 활동별 일정 등록이 진행됩니다.", tags = { "TravelPlanController" })
    @PostMapping("/travel-plan/act")
    public ResponseEntity<ResponseDTO> insertTravelActivityPlan(@RequestBody ActivityDTO activityDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "여행 활동별 일정 등록 성공", travelPlanService.insertTravelActivityPlan(activityDTO)));
    }

    @Operation(summary = "여행 활동별 일정 수정 요청", description = "해당 여행 활동별 일정 수정이 진행됩니다.", tags = { "TravelPlanController" })
    @PutMapping("/travel-plan/act/{activityCode}")
    public ResponseEntity<ResponseDTO> updateTravelActivityPlan(@PathVariable int activityCode , @RequestBody ActivityDTO activityDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "여행 활동별 일정 수정 성공", travelPlanService.updateTravelActivityPlan(activityCode, activityDTO)));
    }

    @Operation(summary = "여행 활동별 일정 삭제 요청", description = "해당 여행 활동별 일정 삭제가 진행됩니다.", tags = { "TravelPlanController" })
    @DeleteMapping("/travel-plan/act-del/{activityCode}")
    public ResponseEntity<ResponseDTO> deleteTravelActivityPlan(@PathVariable int activityCode, @RequestBody MemberDTO memberDTO) {
        return ResponseEntity.ok().body( new ResponseDTO(HttpStatus.OK, "여행 활동별 일정 삭제 성공",
                travelPlanService.deleteTravelActivityPlan(activityCode, memberDTO)));
    }

    /*--------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    //활동금액

    @Operation(summary = "활동금액 조회 요청", description = "활동금액 리스트 조회 처리가 진행됩니다.", tags = { "TravelController"})
    @GetMapping("/travel-plan/expense")
    public ResponseEntity<ResponseDTO> findExpenseList() {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK,"활동금액 조회 성공", travelPlanService.findExpenseList()));
    }

    @Operation(summary = "활동금액 상세 조회 요청", description = "활동금액 상세 조회 처리가 진행됩니다.", tags = { "TravelPlanController" })
    @GetMapping("/travel-plan/expense/{expenseCode}")
    public ResponseEntity<ResponseDTO> findExpenseDetail(@PathVariable int expenseCode) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "상세정보 조회 성공", travelPlanService.findExpenseDetail(expenseCode)));
    }

    @Operation(summary = "활동금액 등록 요청", description = "활동금액 등록이 진행됩니다.", tags = { "TravelPlanController" })
    @PostMapping("/travel-plan/expense")
    public ResponseEntity<ResponseDTO> insertExpense(@RequestBody ExpenseDTO expenseDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "활동금액 등록 성공", travelPlanService.insertExpense(expenseDTO)));
    }

    @Operation(summary = "활동금액 수정 요청", description = "활동금액 수정이 진행됩니다.", tags = { "TravelPlanController" })
    @PutMapping("/travel-plan/expense")
    public ResponseEntity<ResponseDTO> updateExpense(@PathVariable int expenseCode , @RequestBody ExpenseDTO expenseDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "여행일정 수정 성공", travelPlanService.updateExpense(expenseCode, expenseDTO)));
    }

    @Operation(summary = "활동 금액 삭제 요청", description = "활동 금액 삭제가 진행됩니다.", tags = { "TravelPlanController" })
    @DeleteMapping("/travel-plan/expense/{expenseCode}")
    public ResponseEntity<ResponseDTO> deleteExpense(@PathVariable int expenseCode, @RequestBody MemberDTO memberDTO) {
        return ResponseEntity.ok().body( new ResponseDTO(HttpStatus.OK, "활동 금액 삭제 성공",
                travelPlanService.deleteExpense(expenseCode, memberDTO)));
    }

    /*--------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    // 세부활동금액

    @Operation(summary = "세부활동금액 조회 요청", description = "세부활동금액 리스트 조회 처리가 진행됩니다.", tags = { "TravelController"})
    @GetMapping("/travel-plan/expenseDetail")
    public ResponseEntity<ResponseDTO> findExpenseDetailList() {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK,"활동금액 조회 성공", travelPlanService.findExpenseDeatilList()));
    }

    @Operation(summary = "세부활동금액 상세 조회 요청", description = "세부활동금액 상세 조회 처리가 진행됩니다.", tags = { "TravelPlanController" })
    @GetMapping("/travel-plan/expenseDetail/{expenseDetailCode}")
    public ResponseEntity<ResponseDTO> findExpenseDetailByCode(@PathVariable int expenseDetailCode) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "상세정보 조회 성공", travelPlanService.findExpenseDetailByCode(expenseDetailCode)));
    }

    @Operation(summary = "세부활동금액 등록 요청", description = "세부활동금액 등록이 진행됩니다.", tags = { "TravelPlanController" })
    @PostMapping("/travel-plan/expenseDetail")
    public ResponseEntity<ResponseDTO> insertExpenseDetail(@RequestBody ExpenseDetailDTO expenseDetailDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "세부활동금액 등록 성공", travelPlanService.insertExpenseDetail(expenseDetailDTO)));
    }

    @Operation(summary = "세부활동금액 수정 요청", description = "세부활동금액 수정이 진행됩니다.", tags = { "TravelPlanController" })
    @PutMapping("/travel-plan/expenseDetail")
    public ResponseEntity<ResponseDTO> updateExpenseDetail(@PathVariable int expenseDetailCode , @RequestBody ExpenseDetailDTO expenseDetailDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "세부활동금액 수정 성공", travelPlanService.updateExpenseDetail(expenseDetailCode, expenseDetailDTO)));
    }

    @Operation(summary = "세부활동 금액 삭제 요청", description = "세부활동 금액 삭제가 진행됩니다.", tags = { "TravelPlanController" })
    @DeleteMapping("/travel-plan/expenseDetail/{expenseDetailCode}")
    public ResponseEntity<ResponseDTO> deleteExpenseDeatil(@PathVariable int expenseDetailCode, @RequestBody MemberDTO memberDTO) {
        return ResponseEntity.ok().body( new ResponseDTO(HttpStatus.OK, "활동 금액 삭제 성공",
                travelPlanService.deleteExpenseDetail(expenseDetailCode, memberDTO)));
    }

}
