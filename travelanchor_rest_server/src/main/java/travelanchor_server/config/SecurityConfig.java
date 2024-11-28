package travelanchor_server.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import travelanchor_server.jwt.JwtAccessDeniedHandler;
import travelanchor_server.jwt.JwtAuthenticationEntryPoint;
import travelanchor_server.jwt.JwtFilter;
import travelanchor_server.jwt.TokenProvider;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // JWT 토큰을 발급하고 검증하는 Token Provider
    private final TokenProvider tokenProvider;
    // 인증 실패 관련 예외
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    // 접근 거부 관련 예외
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Autowired
    public SecurityConfig(TokenProvider tokenProvider,
                          JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
                          JwtAccessDeniedHandler jwtAccessDeniedHandler) {
        this.tokenProvider = tokenProvider;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
    }

    /* 목차. 1. 암호화 처리를 위한 PasswordEncoder를 빈으로 설정(빈을 등록 시 메소드 이름 오타 없도록 주의!) */
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /* 목차. 2. Spring Security 설정을 무시 할 정적 리소스 등록 */
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring()
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations())
                .requestMatchers("/css/**", "/js/**", "/images/**", "/lib/**", "/productimgs/**", "/travelimgs/**");
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. CSRF 보호 비활성화
                .csrf(csrf -> csrf.disable())
                // 2. 예외 처리
                .exceptionHandling(exception -> {
                    // 필요한 권한이 없을 때 403(Forbidden)을 반환
                    exception.authenticationEntryPoint(jwtAuthenticationEntryPoint);
                    // 인증되지 않은 접근 시 401(Unauthorized)를 반환
                    exception.accessDeniedHandler(jwtAccessDeniedHandler);
                })
                // 3. HTTP 요청에 대한 접근 권한 설정
                .authorizeHttpRequests(auth -> {
                    // CORS Preflight 요청 허용
//                    auth.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll();
//                    // root 경로는 인증 필요
//                    auth.requestMatchers("/").authenticated();
//                    // 특정 경로는 무조건 허용
////                    auth.requestMatchers("/auth/**", "/api/v1/products/**", "/api/v1/reviews/**").permitAll();
////                    auth.requestMatchers("/population/**").permitAll();
//                    auth.requestMatchers("/**").permitAll();
//                    // Swagger API 문서 허용
//                    auth.requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**").permitAll();
//                    // API 경로는 USER 또는 ADMIN 역할을 가진 사용자만 접근 가능
//                    auth.requestMatchers("/api/**").hasAnyRole("USER", "ADMIN");
                    // 어떤 요청이든 허용 -> Security를 활용한 로그인이 모두 완성되지 않았을 때 사용할 것
                    auth.anyRequest().permitAll();
                })
                // 4. 세션 방식을 사용하지 않음
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // 5. 기본 CORS 설정 사용
                .cors(cors -> {})
                // 6. 우리가 직접 작성한 커스텀 필터인 JwtFilter를 필터 체인에 추가
                .addFilterBefore(new JwtFilter(tokenProvider), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(Arrays.asList(
                "http://localhost:3000", "http://192.168.0.75:3000", "http://193.168.0.75:8080", "http://localhost:8080",

                "http://192.168.0.83:3000", "http://192.168.0.83:8080"
        ));

        configuration.setAllowedMethods(Arrays.asList("GET", "PUT", "POST", "DELETE"));

        configuration.setAllowedHeaders(
                Arrays.asList(
                        "Access-Control-Allow-Origin",
                        "Content-type",
                        "Access-Control-Allow-Headers",
                        "Authorization",
                        "X-Requested-With"
                )
        );
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
