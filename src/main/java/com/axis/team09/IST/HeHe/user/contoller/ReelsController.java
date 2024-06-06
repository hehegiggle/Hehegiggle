package com.axis.team09.IST.HeHe.user.contoller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.axis.team09.IST.HeHe.response.Apiesponse;
import com.axis.team09.IST.HeHe.user.entity.Post;
import com.axis.team09.IST.HeHe.user.entity.Reels;
import com.axis.team09.IST.HeHe.user.entity.User;
import com.axis.team09.IST.HeHe.user.service.PostService;
import com.axis.team09.IST.HeHe.user.service.ReelsService;
import com.axis.team09.IST.HeHe.user.service.UserServiceImp;
import com.axis.team09.IST.HeHe.user.service.UserServicee;



@RestController // for creating RESTful API's contain requstbody+controller
@RequestMapping("/api")
public class ReelsController {

	@Autowired
	ReelsService reelsService;
	
	@Autowired
	UserServicee ser;
	
	@PostMapping("/addreels")
	public Reels createReels(@RequestBody Reels reels,@RequestHeader("Authorization") String jwt) throws Exception{
		
		User user=ser.findByJwtToken(jwt);
		return reelsService.createReels(reels, user);
	}
	

	
	
	@GetMapping("/reels/user")
	public List<Reels> getPostById(@RequestHeader("Authorization") String jwt) throws Exception{
		User user=ser.findByJwtToken(jwt);
		return reelsService.findAllReelsByUserId(user.getId());
	}
	
	
	
	@GetMapping("/reels")
	public List<Reels> getReels() throws Exception{
	
		return reelsService.findAllReels();
	}
	
	

	
	
	
	
	
	
	
	
	
}