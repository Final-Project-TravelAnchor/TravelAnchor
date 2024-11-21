package travelanchor_server.member.service;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import travelanchor_server.exception.DuplicatedMemberEmailException;
import travelanchor_server.exception.LoginFailedException;
import travelanchor_server.jwt.TokenProvider;
import travelanchor_server.member.dto.MemberDTO;
import travelanchor_server.member.dto.TokenDTO;
import travelanchor_server.member.entity.Member;
import travelanchor_server.member.entity.MemberRole;
import travelanchor_server.member.repository.MemberRepository;
import travelanchor_server.member.repository.MemberRoleRepository;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Random;

@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final ModelMapper modelMapper;
    private final MemberRoleRepository memberRoleRepository;
    private Map<String, String> verificationCodeMap = new HashMap<>();


    @Autowired
    public AuthService(MemberRepository memberRepository, PasswordEncoder passwordEncoder,
                       TokenProvider tokenProvider, ModelMapper modelMapper,
                       MemberRoleRepository memberRoleRepository) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.modelMapper = modelMapper;
        this.memberRoleRepository = memberRoleRepository;
    }

    public Object login(MemberDTO memberDTO) {

        log.info("[AuthService] login() START");
        log.info("[AuthService] {}", memberDTO);

        /* 목차. 1. 아이디 조회 */
        Member member = memberRepository.findByMemberId(memberDTO.getMemberId());

        if(member == null) {
            log.info("[AuthService] login() Required User Not Found!");
            throw new LoginFailedException(memberDTO.getMemberId() + " 유저를 찾을 수 없습니다.");
        }

        /* 목차. 2. 비밀번호 매칭 */
        if(!passwordEncoder.matches(memberDTO.getMemberPassword(), member.getMemberPassword())) {
            log.info("[AuthService] login() Password Match Failed!");
            throw new LoginFailedException("비밀번호를 다시 확인해주세요.");
        }

        /* 목차. 3. 토큰 발급 */
        TokenDTO newToken = tokenProvider.generateTokenDTO(member);

        return newToken;
    }

    @Transactional
    public MemberDTO signup(MemberDTO memberDTO) {
        log.info("[AuthService] signup() Start.");
        log.info("[AuthService] memberDTO {}", memberDTO);

        if(Objects.equals(memberDTO.getMemberName(), "") || Objects.equals(memberDTO.getMemberNickName(), "") || Objects.equals(memberDTO.getMemberMobileNumber(), "")) {
            log.error("[AuthService] 필수항목에 빈문자열이 존재합니다.");
            throw new DuplicatedMemberEmailException("필수항목에 빈문자열이 존재합니다.");
        }

        if(memberRepository.findByMemberId(memberDTO.getMemberId()) != null) {
            log.info("[AuthService] getMemberID() : ", memberDTO.getMemberId());
            log.info("[AuthService] 아이디가 중복됩니다.");
            throw new DuplicatedMemberEmailException("아이디가 중복됩니다.");
        }

        // 핸드폰 번호 중복 체크
        if (memberRepository.findByMemberMobileNumber(memberDTO.getMemberMobileNumber()) != null) {
            log.info("[AuthService] getMemberMobileNumber() : ", memberDTO.getMemberMobileNumber());
            log.info("[AuthService] 핸드폰 번호가 중복됩니다.");
            throw new DuplicatedMemberEmailException("이미 사용된 핸드폰 번호입니다.");
        }

        Member registMember = modelMapper.map(memberDTO, Member.class);

        registMember.setMemberPassword(passwordEncoder.encode(registMember.getMemberPassword()));
        Member result1 = memberRepository.save(registMember);


        int maxMemberCode = memberRepository.maxMemberCode();	// JPQL을 사용해 회원번호 max값 추출

        MemberRole registMemberRole = new MemberRole(maxMemberCode, 2);

        MemberRole result2 = memberRoleRepository.save(registMemberRole);

        log.info("[AuthService] Member Insert Result {}",
                (result1 != null && result2 != null) ? "회원 가입 성공" : "회원 가입 실패");

        log.info("[AuthService] signup() End.");

        return memberDTO;
    }

    public String findid(String memberMobileNumber) {

        if (memberMobileNumber == null || memberMobileNumber.trim().isEmpty()) {
            log.error("[AuthService] 필수항목에 빈문자열이 존재합니다.");
            throw new DuplicatedMemberEmailException("휴대폰 번호를 입력해주세요.");
        }

        if (!memberMobileNumber.matches("^010-?\\d{3,4}-?\\d{4}$")) {
            throw new DuplicatedMemberEmailException("올바른 형식의 휴대폰 번호를 입력해주세요.");
        }

        Member member = memberRepository.findByMemberMobileNumber(memberMobileNumber);

        return (member != null) ? member.getMemberId() : null;
    }

    public String findpw(String memberMobileNumber) {

        if (memberMobileNumber == null || memberMobileNumber.trim().isEmpty()) {
            log.error("[AuthService] 필수항목에 빈문자열이 존재합니다.");
            throw new DuplicatedMemberEmailException("휴대폰 번호를 입력해주세요.");
        }

        if (!memberMobileNumber.matches("^010-?\\d{3,4}-?\\d{4}$")) {
            throw new DuplicatedMemberEmailException("올바른 형식의 휴대폰 번호를 입력해주세요.");
        }

        Member member = memberRepository.findByMemberMobileNumber(memberMobileNumber);

        if (member == null) {
            log.info("[AuthService] findpw() Required User Not Found!");
            return null; // 사용자 없음, null 반환
        }

        // 6자리 랜덤 인증 코드 생성
        String randomCode = String.format("%06d", new Random().nextInt(999999));
        verificationCodeMap.put(memberMobileNumber, randomCode); // 인증 코드 저장

        log.info("[AuthService] 인증 코드 생성: {}", randomCode);
        return randomCode; // 인증 코드를 반환
    }

    public boolean resetpw(String memberMobileNumber, String verificationCode, String newPassword) {

        String VerificationCode = verificationCodeMap.get(memberMobileNumber);

        if (VerificationCode == null) {
            log.info("[AuthService] 인증 코드가 존재하지 않습니다.");
            return false;
        }

        if (!verificationCode.equals(VerificationCode)) {
            log.info("[AuthService] 인증 코드가 일치하지 않습니다.");
            return false;
        }

        Member member = memberRepository.findByMemberMobileNumber(memberMobileNumber);
        if (member == null) {
            log.info("[AuthService] User Not Found!");
            return false;
        }

        member.setMemberPassword(passwordEncoder.encode(newPassword));
        memberRepository.save(member);

        verificationCodeMap.remove(memberMobileNumber);

        log.info("[AuthService] 비밀번호 재설정 완료");
        return true;
    }
}
