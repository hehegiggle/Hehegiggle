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
import com.axis.team09.IST.HeHe.user.entity.Chat;
import com.axis.team09.IST.HeHe.user.entity.CreateChatRequest;
import com.axis.team09.IST.HeHe.user.entity.Post;
import com.axis.team09.IST.HeHe.user.entity.Reels;
import com.axis.team09.IST.HeHe.user.entity.User;
import com.axis.team09.IST.HeHe.user.service.ChatService;
import com.axis.team09.IST.HeHe.user.service.PostService;
import com.axis.team09.IST.HeHe.user.service.ReelsService;
import com.axis.team09.IST.HeHe.user.service.UserServiceImp;
import com.axis.team09.IST.HeHe.user.service.UserServicee;



@RestController // for creating RESTful API's contain requstbody+controller
@RequestMapping("/api")
public class ChatController {

	@Autowired
    ChatService chatService;
	
	@Autowired
	UserServicee ser;
	
	@PostMapping("/chats")
	public Chat createChat(@RequestHeader("Authorization") String jwt,@RequestBody CreateChatRequest req) throws Exception{
		
		User requser=ser.findByJwtToken(jwt);
		User user2=ser.findById(req.getUserId());
		Chat chat=chatService.createChat(requser, user2);
		
		return chat;
	}
	
	
	@GetMapping("/chats")
	public List<Chat> findUserChat( @RequestHeader("Authorization") String jwt) throws Exception{
		User loggeduser=ser.findByJwtToken(jwt);
		
		List<Chat> chat=chatService.findUsersChat(loggeduser.getId());
		
		return chat;
	}
	
	
	
	@GetMapping("/chats/{chatId}")
	public Chat findChatByid(@PathVariable Integer chatId) throws Exception{
	
		return chatService.findChatByid(chatId);
	}
	
	

	
	
	
	
	
	
	
	
	
}