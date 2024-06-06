package com.axis.team09.IST.HeHe.Config;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration
@EnableAutoConfiguration
public class AppConfig {
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.sessionManagement(managment->managment.sessionCreationPolicy(SessionCreationPolicy.STATELESS)).
		authorizeHttpRequests(
				Authorize -> Authorize.requestMatchers("/api/**")
				.authenticated().anyRequest().permitAll())
		       	.addFilterBefore(new jwtValidator(), BasicAuthenticationFilter.class)
				.csrf(csrf -> csrf.disable());

		return http.build();
	}
	@Bean
	PasswordEncoder password() {
		return new BCryptPasswordEncoder();
	}
}