package travelanchor_server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // CSRF 비활성화 (선택)
                .authorizeHttpRequests(authz -> authz
                        .anyRequest().permitAll() // 모든 요청을 허용
                )
                .formLogin().disable().cors(cors -> {}); // 로그인 화면 비활성화 (필요에 따라)

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(Arrays.asList(
                "http://localhost:3000"
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
