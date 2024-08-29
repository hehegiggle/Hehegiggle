package com.axis.messageservice.controller;

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

import com.axis.messageservice.entity.Chat;
import com.axis.messageservice.entity.User;
import com.axis.messageservice.request.CreateChatRequest;
import com.axis.messageservice.response.MessageResponse;
import com.axis.messageservice.request.CreateChatRequest;
import com.axis.messageservice.service.ChatService;

@RestController
public class ChatController {

	@Autowired
	private ChatService chatService;

	@Autowired
	private RestTemplate restTemplate;

//	@Autowired
//	private UserService userService;

	@PostMapping("/api/chats")
	public ResponseEntity<?> createChat(@RequestHeader("Authorization") String jwt, @RequestBody CreateChatRequest req)
			throws Exception {
		User reqUser = getUserById(jwt);
		User users2 = getUser(jwt, req.getUserId());
		Chat chat = chatService.createChat(reqUser, users2);
		if (chat != null) {
			return ResponseEntity.ok(chat);
		} else {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Chat already exists or is resumed.");
		}
	}

	@GetMapping("/api/chats")
	public List<Chat> findUsersChat(@RequestHeader("Authorization") String jwt) {
		User reqUser = getUserById(jwt);
		List<Chat> chat = chatService.findUsersChat(reqUser.getId(), false);
		return chat;
	}

	@DeleteMapping("/api/chats/delete/{chatId}")
	public ResponseEntity<MessageResponse> deleteChatHandler(@PathVariable("chatId") Integer chatId,
			@RequestHeader("Authorization") String jwt) throws Exception {

		chatService.deleteUserChat(chatId, jwt);

		MessageResponse res = new MessageResponse("Chat Deleted Successfully");

		return new ResponseEntity<MessageResponse>(res, HttpStatus.ACCEPTED);
	}

	private static final String url = "http://USER-SERVICE/api/users/req";

	public User getUserById(String jwt) {
		System.out.println("token------------- +" + jwt);
		HttpHeaders headers = new HttpHeaders();

		headers.set("Authorization", jwt);
		HttpEntity<User> entity = new HttpEntity<>(headers);

		ResponseEntity<User> response = restTemplate.exchange(url, HttpMethod.GET, entity, User.class);
		System.out.println("got user+" + response);
		System.out.println("Userimage-----------------------" + response.getBody().getImage());
		return response.getBody();
	}

	private static String url1 = "http://USER-SERVICE/api/users/id/";

	public User getUser(String jwt, Integer id) {
		System.out.println("token +" + jwt);
		HttpHeaders headers = new HttpHeaders();
		System.out.println("Id is____" + id);
		String url2;
		url2 = url1 + id;
		headers.set("Authorization", jwt);
		HttpEntity<User> entity = new HttpEntity<>(headers);

		ResponseEntity<User> response = restTemplate.exchange(url2, HttpMethod.GET, entity, User.class);
		System.out.println("got user11222121+" + response);

		return response.getBody();
	}

}
