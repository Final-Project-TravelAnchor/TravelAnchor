package travelanchor_server.freeboard.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import travelanchor_server.common.ResponseDTO;
import travelanchor_server.freeboard.dto.FreeBoardDTO;
import travelanchor_server.freeboard.service.FreeBoardService;

@RestController
@RequestMapping("/free-board/v1")
public class FreeBoardController {

    private static final Logger log = LoggerFactory.getLogger(FreeBoardController.class);

    private final FreeBoardService freeBoardService;

    @Autowired
    public FreeBoardController(FreeBoardService freeBoardService) { this.freeBoardService = freeBoardService; }

    @Operation(summary = "자유게시판 리스트 조회 요청", description = "자유게시판 리스트 조회 처리가 진행됩니다.", tags = { "FreeBoardController" })
    @GetMapping("/free-board")
    public ResponseEntity<ResponseDTO> findFreeBoardList(){
        log.info("[FreeBoardController] findFreeBoardList Start");
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", freeBoardService.findFreeBoardList()));
    }

    @Operation(summary = "자유게시판 부분 조회 요청", description = "자유게시판 부분 조회 처리가 진행됩니다.", tags = { "FreeBoardController" })
    @GetMapping("/free-board/{freeBoardCode}")
    public ResponseEntity<ResponseDTO> findFreeBoardDetail(@PathVariable int freeBoardCode) {
        log.info("[FreeBoardController] findFreeBoardDetail Start");
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "부분 정보 조회 성공", freeBoardService.findFreeBoardDetail(freeBoardCode)));
    }

    @Operation(summary = "자유게시판 등록 요청", description = "해당 자유게시판 등록이 진행됩니다.", tags = { "FreeBoardController" })
    @PostMapping("/free-board")
    public ResponseEntity<ResponseDTO> insertFreeBoard(@RequestBody FreeBoardDTO freeBoardDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "자유게시판 등록 성공", freeBoardService.insertFreeBoard(freeBoardDTO)));
    }

    @Operation(summary = "자유게시판 수정 요청", description = "해당 자유게시판 수정이 진행됩니다.", tags = { "FreeBoardController" })
    @PutMapping("/free-board")
    public ResponseEntity<ResponseDTO> updateFreeBoard(@RequestBody FreeBoardDTO freeBoardDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "자유게시판 수정 성공", freeBoardService.updateFreeBoard(freeBoardDTO)));
    }

    @Operation(summary = "자유게시판 삭제 요청", description = "해당 자유게시판 삭제가 진행됩니다.", tags = { "FreeBoardController" })
    @PutMapping("/free-board/del")
    public ResponseEntity<ResponseDTO> deleteFreeBoard(@RequestBody FreeBoardDTO freeBoardDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "자유게시판 삭제 성공", freeBoardService.deleteFreeBoard(freeBoardDTO)));
    }

}
