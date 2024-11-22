package travelanchor_server.population.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import travelanchor_server.common.ResponseDTO;
import travelanchor_server.population.dto.NoticeDTO;
import travelanchor_server.population.dto.PopulationDTO;
import travelanchor_server.population.entity.Notice;
import travelanchor_server.population.service.NoticeService;
import travelanchor_server.population.service.PopulationService;

@RestController
@RequestMapping("/notice/v1")
public class NoticeController {

    private static final Logger log = LoggerFactory.getLogger(NoticeController.class);

    private final NoticeService noticeService;

    @Autowired
    public NoticeController(NoticeService noticeService) {
        this.noticeService = noticeService;
    }

    @Operation(summary = "공지사항 리스트 조회 요청", description = "공지사항 리스트 조회 처리가 진행됩니다.", tags = { "NoticeController" })
    @GetMapping("/notices")
    public ResponseEntity<ResponseDTO> findNoticeList(){

        log.info("[NoticeController] findNoticeList Start");

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", noticeService.findNoticeList()));
    }

    @Operation(summary = "공지사항 조회수 증가 요청", description = "공지사항 조회수 증가 처리가 진행됩니다.", tags = { "NoticeController" })
    @GetMapping("/updateNoticeView/{noticeCode}")
    public ResponseEntity<ResponseDTO> updateNoticeViews(@PathVariable int noticeCode){

        log.info("[NoticeController] updateNoticeViews Start");

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "공지사항 조회수 증가 성공", noticeService.updateNoticeViews(noticeCode)));
    }

//    @Operation(summary = "여행메이트 상세 조회 요청", description = "여행메이트 상세 조회 처리가 진행됩니다.", tags = { "PopulationController" })
//    @GetMapping("/populations/{populationCode}")
//    public ResponseEntity<ResponseDTO> findPopulationDetail(@PathVariable int populationCode) {
//
//        log.info("[PopulationController] findPopulationDetail Start");
//
//        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "상세정보 조회 성공", populationService.findPopulationDetail(populationCode)));
//    }

    @Operation(summary = "공지사항 등록 요청", description = "해당 공지사항 등록이 진행됩니다.", tags = { "NoticeController" })
    @PostMapping("/notices")
    public ResponseEntity<ResponseDTO> insertNotice(@RequestBody NoticeDTO noticeDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "공지사항 등록 성공", noticeService.insertNotice(noticeDTO)));
    }

    @Operation(summary = "공지사항 수정 요청", description = "해당 공지사항 수정이 진행됩니다.", tags = { "NoticeController" })
    @PutMapping("/notices")
    public ResponseEntity<ResponseDTO> updatePopulation(@RequestBody NoticeDTO noticeDTO) {
        // 수정에서 삭제를 진행할 수 있어야 함.
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "공지사항 수정 성공", noticeService.updateNotice(noticeDTO)));

    }
}
