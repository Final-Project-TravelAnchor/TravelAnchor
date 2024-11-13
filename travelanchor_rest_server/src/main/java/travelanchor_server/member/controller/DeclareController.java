package travelanchor_server.member.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import travelanchor_server.common.ResponseDTO;
import travelanchor_server.member.dto.DeclareDTO;
import travelanchor_server.member.dto.ReviewDTO;
import travelanchor_server.member.service.DeclareService;

@RestController
@RequestMapping("/declare/v1")
public class DeclareController {

    private final DeclareService declareService;

    public DeclareController(DeclareService declareService) {
        this.declareService = declareService;
    }

    @Operation(summary = "회원신고 작성 요청", description = "회원신고 작성 요청이 진행됩니다.", tags = {"DeclareController"})
    @PostMapping("/declare")
    public ResponseEntity<ResponseDTO> insertMemberDeclare(@RequestBody DeclareDTO declareDTO) {

        return ResponseEntity
                .ok()
                .body(new ResponseDTO(HttpStatus.OK, "회원신고 작성 성공", declareService.insertMemberDeclare(declareDTO)));
    }
}
