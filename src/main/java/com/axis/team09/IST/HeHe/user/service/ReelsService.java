package com.axis.team09.IST.HeHe.user.service;

import java.util.List;

import com.axis.team09.IST.HeHe.user.entity.Comment;
import com.axis.team09.IST.HeHe.user.entity.Post;
import com.axis.team09.IST.HeHe.user.entity.Reels;
import com.axis.team09.IST.HeHe.user.entity.User;

public interface ReelsService {
	public Reels createReels(Reels reels,User  user) throws Exception;
	
	public List<Reels> findAllReels() throws Exception;
	
	
	public  List<Reels> findAllReelsByUserId(Integer userId)  throws Exception;
}
