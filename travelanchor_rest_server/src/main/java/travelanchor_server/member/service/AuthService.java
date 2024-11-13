package travelanchor_server.member.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import travelanchor_server.exception.LoginFailedException;
import travelanchor_server.jwt.TokenProvider;
import travelanchor_server.member.dto.MemberDTO;
import travelanchor_server.member.dto.TokenDTO;
import travelanchor_server.member.entity.Member;
import travelanchor_server.member.repository.MemberRepository;
import travelanchor_server.member.repository.MemberRoleRepository;

@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final ModelMapper modelMapper;
    private final MemberRoleRepository memberRoleRepository;

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
}
