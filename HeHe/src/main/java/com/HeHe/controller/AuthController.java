package com.HeHe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.HeHe.config.JwtProvider;
import com.HeHe.entity.User;
import com.HeHe.repo.UserRepository;
import com.HeHe.request.LoginRequest;
import com.HeHe.response.AuthResponse;
import com.HeHe.service.CustomUserDetailsService;
import com.HeHe.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private UserService userService;
	
	@Autowired
   private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder PasswordEncoder;
	
	@Autowired
	private CustomUserDetailsService customUserDetails;
	
	// /auth/signup
	@PostMapping("/signup")
	public AuthResponse createUser(@RequestBody User user) throws Exception {
		
		User isExist = userRepository.findByEmail(user.getEmail());
		
		if(isExist!=null) {
			throw new Exception("this email already used with another account");
		}
		User newUser= new User();
		
		newUser.setEmail(user.getEmail());
		newUser.setFirstName(user.getFirstName());
		newUser.setLastName(user.getLastName());
		newUser.setPassword(PasswordEncoder.encode(user.getPassword()));
		
		User savedUser=userRepository.save(newUser);
		
		Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(), savedUser.getPassword());
		
		String token = JwtProvider.generateToken(authentication);
		
		AuthResponse res=new AuthResponse(token,"Register Success");
		
		return res;

	}
	
	//auth/signin
	@PostMapping("/signin")
	public AuthResponse signin(@RequestBody LoginRequest loginrequest) {
		
		Authentication authentication =
				Authenticate(loginrequest.getEmail(),loginrequest.getPassword());
        String token = JwtProvider.generateToken(authentication);
		
		AuthResponse res=new AuthResponse(token,"Login Success");
		
		return res;
	}

	private Authentication Authenticate(String email, String password) {
		UserDetails userDetails = customUserDetails.loadUserByUsername(email);
		
		if(userDetails==null) {
			throw new BadCredentialsException("invalid username");
		}
		if(!PasswordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("wrong password");

		}
		return new UsernamePasswordAuthenticationToken( userDetails,null,userDetails.getAuthorities());
	}
}
