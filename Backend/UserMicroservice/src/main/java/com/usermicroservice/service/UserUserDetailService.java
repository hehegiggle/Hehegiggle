package com.usermicroservice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.usermicroservice.entity.User;
import com.usermicroservice.repository.UserRepository;



@Service
public class UserUserDetailService implements UserDetailsService {
	
	private UserRepository userRepository;
	
	public UserUserDetailService(UserRepository userRepository) {
		this.userRepository=userRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		System.out.println("CustomeUserServiceImplementation.loadUserByUsername()"+username);
		Optional<User> user = userRepository.findByEmail(username);
		System.out.println(user.get()+"User entity");
		if(user.isEmpty()) {
			
			throw new UsernameNotFoundException("user not found with email  - "+username);
		}
		//System.out.println("CustomeUserServiceImplementation.loadUserByUsername()"+ user);
		User user1 = user.get();
		System.out.println("User-----------" + user1.getPassword());
		List<GrantedAuthority> authorities=new ArrayList<>();
		
		return new org.springframework.security.core.userdetails.User(user1.getEmail(),user1.getPassword(),authorities);
	}

}