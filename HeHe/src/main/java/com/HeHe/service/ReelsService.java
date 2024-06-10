package com.HeHe.service;

import java.util.List;

import com.HeHe.entity.Reels;
import com.HeHe.entity.User;

public interface ReelsService {
	
	public Reels createReel(Reels reel, User user);
	
	public List<Reels> findAllReels();
	
	public List<Reels> findUserUserReel(Integer userId);

}
