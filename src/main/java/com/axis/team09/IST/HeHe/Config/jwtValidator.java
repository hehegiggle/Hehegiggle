package com.axis.team09.IST.HeHe.Config;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class jwtValidator extends OncePerRequestFilter {
	
	public static String jwtHeader="Authorization";
	public static String secretKey = "MySecretKey12345!@#$%67890qwertttttttttttttttyyuuuui";

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		String jwt=request.getHeader(jwtHeader);
		if(jwt!=null) {
			
			try {
				String email=JwtProvider.getEmailFromJWT(jwt); // gtting email from bearer token
				List<GrantedAuthority> auth=new ArrayList<>();
				Authentication authentication= new UsernamePasswordAuthenticationToken(email, null,auth);
				SecurityContextHolder.getContext().setAuthentication(authentication);
			}
			catch(Exception e){
				throw new BadCredentialsException("invalid token");
			}
		}
		filterChain.doFilter(request, response);
		
	}


}
