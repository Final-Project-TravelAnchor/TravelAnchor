package travelanchor_server.member.controller;


import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import travelanchor_server.common.ResponseDTO;
import travelanchor_server.member.dto.MemberDTO;
import travelanchor_server.member.service.AuthService;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @Operation(summary = "로그인 요청", description = "로그인 및 인증이 진행됩니다.", tags = {"AuthController"})
    @PostMapping("/login")
    public ResponseEntity<ResponseDTO> login(@RequestBody MemberDTO memberDTO) {

        return ResponseEntity
                .ok()
                .body(new ResponseDTO(HttpStatus.OK, "로그인 성공~", authService.login(memberDTO)));
    }

    @Operation(summary = "회원 가입 요청", description = "회원 가입이 진행됩니다.", tags = {"AuthController"})
    @PostMapping("/signup")
    public ResponseEntity<ResponseDTO> signup(@RequestBody MemberDTO memberDTO) {	// 회원 가입 정보를 받아 냄
        return ResponseEntity
                .ok()
                .body(new ResponseDTO(HttpStatus.CREATED, "회원가입 성공", authService.signup(memberDTO)));
    }

    @Operation(summary = "아이디 찾기 요청", description = "회원정보를 통해 아이디를 찾습니다.", tags = {"AuthController"})
    @PostMapping("/findid")
    public ResponseEntity<ResponseDTO> findid(@RequestBody MemberDTO memberDTO) {
        String findMemberId = authService.findid(memberDTO.getMemberMobileNumber());

        if (findMemberId != null) {
            return ResponseEntity
                    .ok()
                    .body(new ResponseDTO(HttpStatus.OK, "아이디 찾기 성공", findMemberId));
        } else {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new ResponseDTO(HttpStatus.NOT_FOUND, "아이디를 찾을 수 없습니다.", null));
        }
    }

    @Operation(summary = "비밀번호 찾기 요청", description = "회원정보를 통해 비밀번호를 찾습니다.", tags = {"AuthController"})
    @PostMapping("/findpw")
    public ResponseEntity<ResponseDTO> findpw(@RequestBody MemberDTO memberDTO) {
        boolean findMemberPw = authService.findpw(memberDTO.getMemberMobileNumber());

        if (!findMemberPw) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new ResponseDTO(HttpStatus.NOT_FOUND, "해당 번호로 등록된 회원이 없습니다.", null));
        }

        return ResponseEntity
                .ok()
                .body(new ResponseDTO(HttpStatus.OK, "비밀번호 재설정 인증 코드가 전송되었습니다.", null));
    }


    @Operation(summary = "비밀번호를 재설정 요청", description = "인증 코드를 통해 비밀번호 재설정", tags = {"AuthController"})
    @PostMapping("/resetpw")
    public ResponseEntity<ResponseDTO> resetpw(@RequestBody Map<String, String> requestBody) {

        String memberMobileNumber = requestBody.get("memberMobileNumber");
        String verificationCode = requestBody.get("verificationCode");
        String newPassword = requestBody.get("memberPassword");

        boolean resetPw = authService.resetpw(memberMobileNumber, verificationCode, newPassword);

        if (!resetPw) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseDTO(HttpStatus.BAD_REQUEST, "비밀번호 재설정에 실패했습니다. 인증 코드를 확인하세요.", null));
        }

        return ResponseEntity
                .ok()
                .body(new ResponseDTO(HttpStatus.OK, "비밀번호가 재설정되었습니다.", null));
    }

}
