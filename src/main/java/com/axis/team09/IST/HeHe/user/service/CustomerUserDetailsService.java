package com.axis.team09.IST.HeHe.user.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.axis.team09.IST.HeHe.user.entity.User;
import com.axis.team09.IST.HeHe.user.repo.UserRepository;

@Service
public class CustomerUserDetailsService implements UserDetailsService {
	@Autowired
	private UserRepository repo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		User user=  repo.findByEmail(username);
		if(user==null) {
			throw new UsernameNotFoundException("username not found with email"+username);
		}
		List<GrantedAuthority> auth=new ArrayList<>();
		
	
		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), auth);
	}

}
