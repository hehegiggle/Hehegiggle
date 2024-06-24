
package com.usermicroservice.config;

import java.io.IOException;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class JwtGenratorFilter {
	
	private SecretKey key=Keys.hmacShaKeyFor(SecurityContest.JWT_KEY.getBytes());
    
	public String generateToken(Authentication auth) {
		String jwt=Jwts.builder()
				.setIssuedAt(new Date())
				.setExpiration(new Date(new Date().getTime()+86400000))
				.claim("username", auth.getName())
				.signWith(key)
			     .compact();
		return jwt;
		
	}
	public String getEmailFromJwtToken(String jwt) {
		jwt=jwt.substring(7);
		Claims claims = Jwts.parser().setSigningKey(key).build().parseClaimsJws(jwt).getBody();		
		String email=String.valueOf(claims.get("username"));
		return email;
	}
	
	public String populateAuthorities(Collection <? extends GrantedAuthority> collection) {
		Set<String> auths=new HashSet<>();
		for(GrantedAuthority authority:collection) {
			auths.add(authority.getAuthority());
		}
		
		return String.join(",", auths);
	}
	
}
