package travelanchor_server.travelreport.controller;

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
import travelanchor_server.travelreport.entity.TravelReport;
import travelanchor_server.travelreport.service.TravelReportService;

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

}
