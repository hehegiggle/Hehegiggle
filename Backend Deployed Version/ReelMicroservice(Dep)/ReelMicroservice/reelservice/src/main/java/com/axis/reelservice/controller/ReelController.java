package com.axis.reelservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.axis.reelservice.dto.UserDTO;
import com.axis.reelservice.entity.Reel;
import com.axis.reelservice.response.MessageResponse;
import com.axis.reelservice.service.ReelService;

@RestController
public class ReelController {

	@Autowired
	private ReelService reelService;

	@PostMapping("/api/reels")
	public Reel createReels(@RequestBody Reel reel, @RequestHeader("Authorization") String jwt) {
		System.out.println("Entered-------------------");
		UserDTO reqUser = reelService.getUserById(jwt);
		reel.setUser(reqUser);
		Reel createdReel = reelService.createReel(reel, reqUser);
		return createdReel;
	}

	@GetMapping("/api/reels")
	public List<Reel> findAllReels(@RequestHeader("Authorization") String jwt) {
		UserDTO reqUser = reelService.getUserById(jwt);
		System.out.println(reqUser);
		List<Reel> reels = reelService.findAllReels();
		return reels;
	}

	@GetMapping("/api/reels/user/{userId}")
	public List<Reel> findUsersReels(@PathVariable Integer userId, @RequestHeader("Authorization") String jwt)
			throws Exception {
		
		System.out.println("User Id--------"+userId);
		//UserDTO reqUser = reelService.getUserById(jwt);
		//System.out.println("Result------------"+reqUser);
		List<Reel> reels = reelService.findUsersReel(userId);
		System.out.println("Reels o/p---"+reels);
		return reels;
	}
	
	@DeleteMapping("/api/reels/user/delete-reel/{reelId}")
	public ResponseEntity<MessageResponse> deleteReelByReelId(@PathVariable("reelId") Integer reelId, @RequestHeader("Authorization") String token) throws Exception{
		
		String message = reelService.deleteReelByReelId(reelId, token);

		MessageResponse res = new MessageResponse(message);

		return new ResponseEntity<MessageResponse>(res, HttpStatus.OK);
	}

}
