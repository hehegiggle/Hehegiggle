package com.axis.reelservice.service;

import java.util.List;

import com.axis.reelservice.dto.UserDTO;
import com.axis.reelservice.entity.Reel;




public interface ReelService {
	
	UserDTO getUserById(String jwt);
	
	public List<Reel> findAllReels();
	
	public List<Reel> findUsersReel(Integer userId) throws Exception;

	Reel createReel(Reel reel, UserDTO user);

}
