package travelanchor_server.member.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import travelanchor_server.member.dto.MemberDTO;
import travelanchor_server.member.entity.Member;
import travelanchor_server.member.repository.MemberRepository;

@Service
public class MemberService {

    private static final Logger log = LoggerFactory.getLogger(MemberService.class);
    private final MemberRepository memberRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public MemberService(MemberRepository memberRepository, ModelMapper modelMapper) {
        this.memberRepository = memberRepository;
        this.modelMapper = modelMapper;
    }

    public MemberDTO findMyInfo(String memberId) {
        log.info("[MemberService] getMyInfo Start =======================");

        Member member = memberRepository.findByMemberId(memberId);
        log.info("[MemberService] {}", member);
        log.info("[MemberService] getMyInfo End =========================");

        return modelMapper.map(member, MemberDTO.class);
    }

    @Transactional
    public Object updateMemberInfo(int memberId, MemberDTO memberDTO) {
        log.info("[MemberService] updateMyMemberInfo() start");
        log.info("[MemberService] memberId: " +  memberId);
        int result = 0;

        try {

            Member member = memberRepository.findById(memberId).get();
            log.info("[MemberService] member: " + member);
            member.setMemberNickName(memberDTO.getMemberNickName());
            member.setMemberPassword(memberDTO.getMemberPassword());
            member.setProfilePhoto((memberDTO.getProfilePhoto()));

            memberRepository.save(member);

            result = 1;
        } catch (Exception e) {
            throw new RuntimeException(e);

        }
        log.info("[MemberService] updateMemberInfo() End");
        return(result > 0) ? "회원정보 수정 성공" : "회원정보 수정 실패";
    }
}
