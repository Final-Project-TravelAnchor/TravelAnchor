package travelanchor_server.travelreport.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import travelanchor_server.common.ResponseDTO;
import travelanchor_server.travelplan.dto.TravelPlanDTO;
import travelanchor_server.travelreport.dto.TravelReportDTO;
import travelanchor_server.travelreport.entity.TravelReport;
import travelanchor_server.travelreport.service.TravelReportService;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/travel-report/v1")
public class TravelReportController {

    private static final Logger log = LoggerFactory.getLogger(TravelReportController.class);

    private final TravelReportService travelReportService;

    @Autowired
    public TravelReportController(TravelReportService travelReportService) { this.travelReportService = travelReportService; }

    @Operation(summary = "여행 후기 리스트 조회 요청", description = "여행 후기 리스트 조회 처리가 진행됩니다.", tags = { "TravelReportController" })
    @GetMapping("/travel-report")
    public ResponseEntity<ResponseDTO> findTravelReportList(){
        log.info("[TravelReportController] findTravelReportList Start");
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", travelReportService.findTravelReportList()));
    }

    @Operation(summary = "여행 후기 부분 조회 요청", description = "여행 후기 부분 조회 처리가 진행됩니다.", tags = { "TravelReportController" })
    @GetMapping("/travel-report/{reportCode}")
    public ResponseEntity<ResponseDTO> findTravelReportDetail(@PathVariable int reportCode) {
        log.info("[TravelReportController] findTravelReportDetail Start");
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "부분 정보 조회 성공", travelReportService.findTravelReportDetail(reportCode)));
    }

    @Operation(summary = "여행 후기 등록 요청", description = "해당 여행 후기 등록이 진행됩니다.", tags = { "TravelReportController" })
    @PostMapping("/travel-report")
    public ResponseEntity<ResponseDTO> insertTravelReport(@RequestBody TravelReportDTO travelReportDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "여행 후기 등록 성공", travelReportService.insertTravelReport(travelReportDTO)));
    }

    @Operation(summary = "여행 후기 수정 요청", description = "해당 여행 후기 수정이 진행됩니다.", tags = { "TravelPlanController" })
    @PutMapping("/travel-report")
    public ResponseEntity<ResponseDTO> updateTravelReport(@RequestBody TravelReportDTO travelReportDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "여행 후기 수정 성공", travelReportService.updateTravelReport(travelReportDTO)));
    }

    @Operation(summary = "여행 후기 삭제 요청", description = "해당 여행 후기 삭제가 진행됩니다.", tags = { "TravelReportController" })
    @PutMapping("/travel-report/del")
    public ResponseEntity<ResponseDTO> deleteTravelReport(@RequestBody TravelReportDTO travelReportDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "여행 후기 삭제 성공", travelReportService.deleteTravelReport(travelReportDTO)));
    }

}
