package travelanchor_server.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(JwtFilter.class);
    private final TokenProvider tokenProvider;

    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String BEARER_PREFIX = "Bearer";

    public JwtFilter(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    /* 설명. 각 요청에 대해 JWT 토큰을 검사하고 유효한 경우 SecurityContext에 인증 정보를 설정. */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        /* 설명. 요청에서 토큰값 추출 */
        String jwt = resolveToken(request);

        /* 설명. 추출한 토큰의 유효성 검사 후 인증을 위해 Authentication 객체를 SecurityContextHolder에 담는다.
         *  아래 if()문 내 2줄의 코드가 인증 작업의 핵심이라고 이해하면 된다.
         * */
        if(StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
            Authentication authentication = tokenProvider.getAuthentication(jwt);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        /* 설명. 다음 filter chain 진행 */
        filterChain.doFilter(request, response);
    }

    /* 설명. Request Header에서 JWT 토큰을 추출(위에 정의한 static final 변수 두개 사용) */
    private String resolveToken(HttpServletRequest request) {

        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);	// = "Authorization"

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
            /* 설명. 사용자가 보낸 토큰 값 추출 */
            return bearerToken.substring(7);
        }

        return null;
    }
}
