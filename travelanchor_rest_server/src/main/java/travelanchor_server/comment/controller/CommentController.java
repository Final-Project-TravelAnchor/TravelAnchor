package travelanchor_server.comment.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import travelanchor_server.comment.dto.CommentDTO;
import travelanchor_server.comment.service.CommentService;
import travelanchor_server.common.ResponseDTO;

@RestController
@RequestMapping("/comment/v1")
public class CommentController {

    private static final Logger log = LoggerFactory.getLogger(CommentController.class);

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) { this.commentService = commentService; }

    @Operation(summary = "댓글 리스트 조회 요청", description = "댓글 리스트 조회 처리가 진행됩니다.", tags = { "CommentController" })
    @GetMapping("/comment")
    public ResponseEntity<ResponseDTO> findCommentList(){
        log.info("[CommentController] findCommentList Start");
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", commentService.findCommentList()));
    }

    @Operation(summary = "댓글 부분 조회 요청", description = "댓글 부분 조회 처리가 진행됩니다.", tags = { "CommentController" })
    @GetMapping("/comment/{commentCode}")
    public ResponseEntity<ResponseDTO> findCommentDetail(@PathVariable int commentCode) {
        log.info("[CommentController] findCommentDetail Start");
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "부분 정보 조회 성공", commentService.findCommentDetail(commentCode)));
    }

    @Operation(summary = "댓글 등록 요청", description = "해당 댓글 등록이 진행됩니다.", tags = { "CommentController" })
    @PostMapping("/comment")
    public ResponseEntity<ResponseDTO> insertComment(@RequestBody CommentDTO commentDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "댓글  등록 성공", commentService.insertComment(commentDTO)));
    }

    @Operation(summary = "댓글 수정 요청", description = "해당 댓글 수정이 진행됩니다.", tags = { "CommentController" })
    @PutMapping("/comment/{commentCode}")
    public ResponseEntity<ResponseDTO> updateComment(@PathVariable int commentCode , @RequestBody CommentDTO commentDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "댓글  수정 성공", commentService.updateComment(commentCode, commentDTO)));
    }

    @Operation(summary = "댓글 삭제 요청", description = "해당 댓글 삭제가 진행됩니다.", tags = { "CommentController" })
    @DeleteMapping("/comment/{commentCode}")
    public ResponseEntity<ResponseDTO> deleteComment(@PathVariable int commentCode) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "댓글  삭제 성공", commentService.deleteComment(commentCode)));
    }

}
