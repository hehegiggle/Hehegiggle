package com.userservice.Config;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;

//import org.springframework.security.core.Authentication;

import com.userservice.service.CustomUserDetails;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JwtProvider {
	
	private static SecretKey key=Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());
	 // Casting to your custom UserDetails class
	public static String generateToken(Authentication auth) {
		CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
		
		String jwt =Jwts.builder()
				.setIssuer("Hehegiggle").setIssuedAt(new Date()).setExpiration(new Date(new Date().getTime()+86400000))
				.claim("email",auth.getName())
			    .claim("userId", userDetails.getId())
				.signWith(key)
				.compact();
		return jwt;
		
	
		
	}
	public static String getEmailFromJWT(String jwt)
	{
		jwt=jwt.substring(7);
		
		Claims claims = Jwts.parser().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
		
		String email=String.valueOf(claims.get("email"));
		
		return email;
		
		
	}
	 public static Integer getUserIdFromJWT(String jwt) {
		 jwt=jwt.substring(7);
		 Claims claims = Jwts.parser().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
		 
	        return claims.get("userId", Integer.class);
	    }

}
