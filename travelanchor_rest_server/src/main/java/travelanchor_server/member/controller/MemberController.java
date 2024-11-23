package travelanchor_server.member.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import travelanchor_server.common.ResponseDTO;
import travelanchor_server.member.dto.MemberDTO;
import travelanchor_server.member.service.MemberService;

@RestController
@RequestMapping("/member/v1")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @Operation(summary = "회원 조회 요청", description = "회원 한명이 조회됩니다.", tags = {"MemberController"})
    @GetMapping("/members/{memberId}")
    public ResponseEntity<ResponseDTO> findMemberInfo(@PathVariable String memberId) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", memberService.findMyInfo(memberId)));
    }

    @Operation(summary = "회원정보 수정 요청", description = "해당 회원정보 수정이 진행됩니다.", tags = {"MemberController "})
    @PutMapping("/members/{memberId}")
    public ResponseEntity<ResponseDTO> updateMemberInfo(@PathVariable String memberId, @RequestBody MemberDTO memberDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK,"회원정보 수정 성공",memberService.updateMemberInfo(memberId, memberDTO)));
    }

}
