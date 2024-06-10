package com.HeHe.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.HeHe.entity.Reels;
import com.HeHe.entity.User;
import com.HeHe.repo.ReelsRepository;

public class ReelsServiceImpl implements ReelsService {

	
	@Autowired
	private ReelsRepository reelsRepository;
	
	@Autowired
	private UserService userService;
	
	@Override
	public Reels createReel(Reels reel, User user) {
		
		Reels createReel=new Reels();
		createReel.setTitle(reel.getTitle());
		createReel.setUser(user);
		createReel.setVideo(reel.getVideo());

		return reelsRepository.save(createReel);
	}

	@Override
	public List<Reels> findAllReels() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Reels> findUserUserReel(Integer userId) {
		// TODO Auto-generated method stub
		return null;
	}

}
