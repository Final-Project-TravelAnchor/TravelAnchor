package travelanchor_server.member.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/* 설명.
 *  Spring Security의 UserDetailsService를 구현해 사용자 인증 정보를 제공하고,
 *  사용자 권한을 설정하는 책임을 수행한다.
 *  앞서 먼저 배워봤던 Session 방식의 인증/인가 시스템에서도 UserDetailsService를 사용했었다.
 * */
@Service
public class CustomUserDetailsService implements UserDetailsService {


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }
}
