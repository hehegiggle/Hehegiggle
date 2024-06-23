package com.usermicroservice.controller;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.usermicroservice.config.JwtGenratorFilter;
import com.usermicroservice.entity.User;
import com.usermicroservice.exception.UserException;
import com.usermicroservice.repository.UserRepository;
import com.usermicroservice.request.LoginRequest;
import com.usermicroservice.response.AuthResponse;
import com.usermicroservice.service.UserUserDetailService;

import jakarta.validation.Valid;

@RestController
public class AuthController {

	private UserRepository userRepository;
	private PasswordEncoder passwordEncoder;
	private JwtGenratorFilter jwtGenratorFilter;
	private UserUserDetailService customUserDetails;

	@PostMapping("/get")
	public String get(@RequestBody String ap) {
		System.out.println("new" +ap);
		return "Welcome added";
	}

	public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtGenratorFilter jwtGenratorFilter,
			UserUserDetailService customUserDetails) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtGenratorFilter = jwtGenratorFilter;
		this.customUserDetails = customUserDetails;

	}

	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws UserException {
		System.out.println("Good Good");
		String email = user.getEmail();
		String password = user.getPassword();
		String name = user.getName();
		String username = user.getUsername();
		LocalDate dateOfBirth = user.getDateOfBirth();
		

		Optional<User> isEmailExist = userRepository.findByEmail(email);
		Optional<User> isUserNameExist = userRepository.findByUsername(username);

		if (isEmailExist.isPresent()) {
			throw new UserException("Email Is Already Used With Another Account");
		}
		
		else if(isUserNameExist.isPresent()) {
			throw new UserException("Username Is Already Taken");
		}

		User createdUser = new User();
		createdUser.setEmail(email);
		createdUser.setPassword(passwordEncoder.encode(password));
		createdUser.setUsername(username);
		createdUser.setName(name);
		createdUser.setDateOfBirth(dateOfBirth);
		
		User savedUser = userRepository.save(createdUser);

		Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = jwtGenratorFilter.generateToken(authentication);

		AuthResponse authResponse = new AuthResponse();
		authResponse.setJwt(token);
		authResponse.setMessage("Registration Successfull");

		return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.OK);

	}

	@PostMapping("/signin")
	public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest loginRequest) throws UserException {

		String username = loginRequest.getEmail();
		String password = loginRequest.getPassword();

//		Optional<User> user = userRepository.findByEmail(username);
//		if(user.isEmpty()) {
//			throw new UserException("user not found with username  "+ username);
//		}

		System.out.println(username + " ----- " + password);

		Authentication authentication = authenticate(username, password);
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
//
		System.out.println("Passed Authentication");
		String token = jwtGenratorFilter.generateToken(authentication);
		System.out.println("Going for Auth Response");
		AuthResponse authResponse = new AuthResponse();

		authResponse.setMessage("Login Success");
		authResponse.setJwt(token);

		return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.OK);
	}

	private Authentication authenticate(String username, String password) {
		UserDetails userDetails = customUserDetails.loadUserByUsername(username);

		System.out.println("sign in userDetails - " + userDetails);

		if (userDetails == null) {
			System.out.println("sign in userDetails - null " + userDetails);
			throw new BadCredentialsException("No Accounts Found");
		}
		if (!passwordEncoder.matches(password, userDetails.getPassword())) {
			System.out.println("sign in userDetails - password not match " + userDetails);
			throw new BadCredentialsException("Invalid password");
		}
		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}
}