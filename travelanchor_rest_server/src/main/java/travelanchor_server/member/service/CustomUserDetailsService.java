package travelanchor_server.member.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import travelanchor_server.member.dto.MemberDTO;
import travelanchor_server.member.entity.Member;
import travelanchor_server.member.entity.MemberRole;
import travelanchor_server.member.repository.MemberRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public CustomUserDetailsService(MemberRepository memberRepository, ModelMapper modelMapper) {
        this.memberRepository = memberRepository;
        this.modelMapper = modelMapper;
    }

    @Transactional
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        // 사용자 ID로 데이터베이스에서 사용자 엔티티 조회
        Member member = memberRepository.findByMemberId(username);

        // 조회된 사용자 엔티티를 DTO로 매핑.
        // 이 MemberDTO는 엔티티를 옮겨 담는 DTO역할도 수행하지만, 결국 내부적으로 UserDetails가 구현되어 있다.
        MemberDTO memberDTO = modelMapper.map(member, MemberDTO.class);

        List<GrantedAuthority> authorities = new ArrayList<>();

        // Member 엔티티 내 memberRole에서 회원별 권한을 추출해 빈 배열에 옮겨 담는다.
        for(MemberRole memberRole : member.getMemberRole()) {
            String authorityName = memberRole.getAuthority().getAuthorityName();
            authorities.add(new SimpleGrantedAuthority(authorityName));
        }

        // 모두 옮겨담은 권한 리스트를 MemberDTO에 주입해준다.
        memberDTO.setAuthorities(authorities);

        return memberDTO;
    }
}
