package travelanchor_server.member.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import travelanchor_server.common.ResponseDTO;
import travelanchor_server.member.dto.PointDTO;
import travelanchor_server.member.service.PointService;

@RestController
@RequestMapping("/point/v1")
public class PointController {

    private final PointService pointService;

    @Autowired
    public PointController(PointService pointService) {
        this.pointService = pointService;
    }


    @Operation(summary = "회원 점수 조회 요청", description = "회원 점수가 조회됩니다.", tags = {" PointController "})
    @GetMapping("/{memberCode}")
    public ResponseEntity<ResponseDTO> findMemberPoint(@PathVariable int memberCode) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "점수 조회 성공", pointService.findMemberPoint(memberCode)));
    }

    @Operation(summary = "회원 점수 수정 요청", description = "회원 점수가 수정됩니다.", tags = {" PointController "})
    @PutMapping("/{memberCode}")
    public ResponseEntity<ResponseDTO> updateMemberPoint(@PathVariable int memberCode, @RequestBody PointDTO pointDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "점수 조회 성공", pointService.updateMemberPoint(memberCode, pointDTO)));
    }
}
