package com.HeHe.config;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JwtProvider {

	private static  SecretKey Key=Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());
	
	public static String generateToken(Authentication auth) {
		
		String jwt= Jwts.builder()
				.setIssuer("CodeWithJosh").setIssuedAt(new Date())
				.setExpiration(new Date(new Date().getTime()+6400000))
				.claim("email", auth.getName())
				.signWith(Key)
				.compact();
		return jwt;
		
	}
	
	public static String getEmailFromJwtToken(String jwt) {
		// Bearer token 
		jwt=jwt.substring(7);
		
		Claims claims=Jwts.parser()
				.setSigningKey(Key).build().parseClaimsJws(jwt).getBody();
		
		String email=String.valueOf(claims.get("email"));
		
		return email;
		
	}
	
}
