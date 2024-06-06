package com.axis.team09.IST.HeHe.Config;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JwtProvider {
	
	private static SecretKey key= Keys.hmacShaKeyFor(jwtValidator.secretKey.getBytes()); // for generete tokens
	public static String generateToken(Authentication auth) {
		String jwt= Jwts.builder().
				setIssuer("Hehe")
				.setIssuedAt(new Date()).
				setExpiration(new Date(new Date().getTime()+86400000))
				.claim("email", auth.getName())
				.signWith(key)
				.compact();
		return jwt;
	}
	public static String getEmailFromJWT(String jwt) {
		
		jwt=jwt.substring(7);
		Claims claims=Jwts.parser().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
		String email=String.valueOf(claims.get("email"));
		return email;
	}
}
