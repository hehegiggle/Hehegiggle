package com.axis.messageservice.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.axis.messageservice.entity.Message;
import com.axis.messageservice.entity.User;
import com.axis.messageservice.response.MessageResponse;
import com.axis.messageservice.service.MessageService;

@RestController
public class MessageController {

	@Autowired
	private MessageService messageService;

	@Autowired
	private RestTemplate restTemplate;

//	@Autowired
//	private UserService userService;

	@PostMapping("/api/messages/chat/{chatId}")
	public Message createMessage(@RequestBody Message req, @RequestHeader("Authorization") String jwt,
			@PathVariable("chatId") Integer chatId) throws Exception {
		User reqUser = getUserById(jwt);
		System.out.println("I got message body--------" + req);
		Message message = messageService.createMessage(reqUser, chatId, req);

		return message;
	}

	@GetMapping("/api/messages/chat/{chatId}")
	public List<Message> findChatsMessage(@RequestHeader("Authorization") String jwt,
			@PathVariable("chatId") Integer chatId) throws Exception {

		List<Message> messages = messageService.findChatsMessages(chatId, jwt);
		// Collections.reverse(messages);
		return messages;
	}

	// Delete All Messages by ChatId (Clear All messages)
	@DeleteMapping("/api/messages/delete/{chatId}")
	public ResponseEntity<MessageResponse> deleteAllMessages(@PathVariable("chatId") Integer chatId, @RequestHeader("Authorization") String jwt) throws Exception {

		messageService.deleteAllMessages(chatId, jwt);
		MessageResponse res = new MessageResponse("All Messages Deleted Successfully");

		return new ResponseEntity<MessageResponse>(res, HttpStatus.ACCEPTED);
	}
	
	// Delete Individual message By MessageId
	@DeleteMapping("/api/messages/deleteById/{messageId}")
	public ResponseEntity<MessageResponse> deleteMessageById(@PathVariable("messageId") Integer messageId, @RequestHeader("Authorization") String jwt) throws Exception{
		
		messageService.deleteMessageById(messageId, jwt);
		MessageResponse res = new MessageResponse("Messages Deleted Successfully");

		return new ResponseEntity<MessageResponse>(res, HttpStatus.ACCEPTED);
	}
	
	private static final String url = "http://USER-SERVICE/api/users/req";

	public User getUserById(String jwt) {
		System.out.println("token +" + jwt);
		HttpHeaders headers = new HttpHeaders();

		headers.set("Authorization", jwt);
		HttpEntity<User> entity = new HttpEntity<>(headers);

		ResponseEntity<User> response = restTemplate.exchange(url, HttpMethod.GET, entity, User.class);
		System.out.println("got user+" + response);
		return response.getBody();
	}

}
