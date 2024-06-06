package com.axis.team09.IST.HeHe.user.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.axis.team09.IST.HeHe.user.entity.Reels;
import com.axis.team09.IST.HeHe.user.entity.User;
import com.axis.team09.IST.HeHe.user.repo.ReelsRepository;

@Service
public class ReelsServiceIml implements ReelsService {

	@Autowired
	private ReelsRepository repo;
	
	@Autowired
	private  UserServicee userservice;

	@Override
	public Reels createReels(Reels reels, User user) throws Exception {
		reels.setUser(user);
		
		
		return repo.save(reels);
	}

	@Override
	public List<Reels> findAllReels() throws Exception {
		// TODO Auto-generated method stub
		return repo.findAll();
	}

	@Override
	public List<Reels> findAllReelsByUserId(Integer userId) throws Exception {
		// TODO Auto-generated method stub
		
		return repo.findReelsByUserId(userId);
	}

}
