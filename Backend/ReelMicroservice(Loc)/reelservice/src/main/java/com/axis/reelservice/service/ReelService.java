package com.axis.reelservice.service;

import java.util.List;
import java.util.Optional;

import com.axis.reelservice.dto.UserDTO;
import com.axis.reelservice.entity.Reel;
import com.axis.reelservice.entity.ReelLikedBy;

public interface ReelService {

	UserDTO getUserById(String jwt);

	public List<Reel> findAllReels();

	public List<Reel> findUsersReel(Integer userId) throws Exception;

	Reel createReel(Reel reel, UserDTO user);

	String deleteReelByReelId(Integer reelId, String token) throws Exception;

	String likeReel(Integer reelId, String token) throws Exception;

	String unlikeReel(Integer reelId, String token) throws Exception;

	Optional<Reel> getReelById(Integer reelId, String token);

}
