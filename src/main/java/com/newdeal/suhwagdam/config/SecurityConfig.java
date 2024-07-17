package com.newdeal.suhwagdam.config;

import com.newdeal.suhwagdam.config.filter.JwtTokenFilter;
import com.newdeal.suhwagdam.exception.CustomAuthenticationEntryPoint;
import com.newdeal.suhwagdam.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.RegexRequestMatcher;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    @Value("${jwt.secret-key}")
    private String key;

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring().requestMatchers(RegexRequestMatcher.regexMatcher("^(?!/api/).*"))
                .requestMatchers("/api/*/auth/**")
                .requestMatchers(HttpMethod.GET, "/api/v1/goods/**")
                .requestMatchers(HttpMethod.GET, "/api/v1/bid/**");
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, AuthService authService) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/*/auth/*").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/goods/*").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/bid/*").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/v1/address-info/*").permitAll()
                        .anyRequest().authenticated()
                )
                .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(new JwtTokenFilter(key, authService), UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(authenticationManager -> authenticationManager.authenticationEntryPoint(new CustomAuthenticationEntryPoint()));

        return http.build();
    }
}
