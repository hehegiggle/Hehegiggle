package com.axis.team09.IST.HeHe.user.contoller;

import java.net.Authenticator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.axis.team09.IST.HeHe.Config.JwtProvider;
import com.axis.team09.IST.HeHe.response.AuthResponse;
import com.axis.team09.IST.HeHe.user.entity.LoginRequest;
import com.axis.team09.IST.HeHe.user.entity.User;
import com.axis.team09.IST.HeHe.user.repo.UserRepository;
import com.axis.team09.IST.HeHe.user.service.CustomerUserDetailsService;
import com.axis.team09.IST.HeHe.user.service.UserServicee;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class Authcontroller {

	@Autowired
	private UserRepository repo;
	@Autowired
	private UserServicee userService;
	@Autowired
	private PasswordEncoder pass;

	@Autowired
	private CustomerUserDetailsService cust;

	@PostMapping("/signup")
	public AuthResponse registerUser(@Valid @RequestBody User user) throws Exception {
		String email = user.getEmail();
		User exists = repo.findByEmail(user.getEmail());
		if (exists != null) {
			throw new Exception("Email already Exists");
		}
		user.setPassword(pass.encode(user.getPassword()));
		User newUser = repo.save(user);
		Authentication auth = new UsernamePasswordAuthenticationToken(newUser.getEmail(), newUser.getPassword());
		String token = JwtProvider.generateToken(auth);

		AuthResponse res = new AuthResponse(token, "register success");
		return res;

	}

	@PostMapping("/signin")
	public AuthResponse signin(@RequestBody LoginRequest req) {
		Authentication auth = authenticate(req.getEmail(), req.getPassword());
		String token = JwtProvider.generateToken(auth);

		AuthResponse res = new AuthResponse(token, "login success");
		return res;
	}

	private Authentication authenticate(String email, String password) {
		// TODO Auto-generated method stub
		UserDetails userservice = cust.loadUserByUsername(email);
		if (userservice == null) {
			throw new BadCredentialsException("Username can not be null");
		}
		if (!pass.matches(password, userservice.getPassword())) {
			throw new BadCredentialsException("Invalid credentials");
		}
		return new UsernamePasswordAuthenticationToken(userservice, null, userservice.getAuthorities());
	}

}
