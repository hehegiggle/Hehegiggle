package com.axis.team09.IST.HeHe.user.service;

import java.util.List;

import com.axis.team09.IST.HeHe.user.entity.User;

public interface UserServicee {

	public User register(User user);

	public User findById(Integer id);

	public User findByemail(String email);

	public User followUser(Integer id1, Integer id2) throws Exception;

	public User updateUser(Integer id,User user) throws Exception;

	public List<User> search(String query);
	
	public List<User> getAll();
	
	public User deleteUser(Integer id);
	public User findByJwtToken(String jwt);
}
