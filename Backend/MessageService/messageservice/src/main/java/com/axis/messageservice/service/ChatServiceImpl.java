package com.axis.messageservice.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.axis.messageservice.entity.Chat;
import com.axis.messageservice.entity.User;
import com.axis.messageservice.event.NotificationEvent;
import com.axis.messageservice.repository.ChatRepository;

@Service
public class ChatServiceImpl implements ChatService {

	@Autowired
	private ChatRepository chatRepository;

	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private NotificationService notificationService;

	@Override
	public Chat getExistingChat(User user1, User user2) {
		// Find a chat where both users are part of it
		Chat chat = chatRepository.findChatByUsersId(user1, user2);

		// If chat exists and has been deleted by one user but not by the other
		if (chat != null && (chat.getDeletedByUsers().contains(user1.getId())
				|| chat.getDeletedByUsers().contains(user2.getId()))) {
			return chat; // Resume the old chat
		}

		return null; // No existing chat
	}

	@Override
	public Chat createChat(User reqUser, User user2) throws Exception {
		Chat existingChat = getExistingChat(reqUser, user2);

		if (existingChat != null) {
			// If chat exists but one user has deleted it, resume the chat
			if (existingChat.getDeletedByUsers().contains(reqUser.getId())) {
				existingChat.getDeletedByUsers().remove(reqUser.getId());
				return chatRepository.save(existingChat);
			}
			return existingChat;
		}

		// Create a new chat if it doesn't exist
		Chat chat = new Chat();
		chat.getUsers().add(user2);
		chat.getUsers().add(reqUser);
		chat.setTimestamp(LocalDateTime.now());
		System.out.println("chat " + chat);
		chat.setDeletedByUsers(Set.of());

		// Send Notification
		NotificationEvent notificationEvent = new NotificationEvent(null, // notificationId, will be generated
				"Chat Creation", user2.getId().toString(), null, null, null, // commentId, not applicable
				reqUser.getId().toString(), reqUser.getUsername() + " created a chat with you", LocalDateTime.now());

		if (!user2.getId().toString().equals(reqUser.getId().toString())) {
			notificationService.sendNotification(notificationEvent);
			return chatRepository.save(chat);
		} else {
			return chatRepository.save(chat);
		}
	}

	@Override
	public Chat findChatById(Integer chatId) throws Exception {
		Optional<Chat> opt = chatRepository.findById(chatId);

		if (opt.isEmpty()) {
			throw new Exception("Chat not found with Id " + chatId);
		}

		return opt.get();
	}

	@Override
	public List<Chat> findUsersChat(Integer userId, boolean includeDeleted) {
		List<Chat> chats = chatRepository.findByUsersId(userId);

		if (!includeDeleted) {
			// Filter out chats that are deleted by the user
			return chats.stream().filter(chat -> !chat.getDeletedByUsers().contains(userId))
					.collect(Collectors.toList());
		}
		return chats;
	}

	@Override
	public String deleteUserChat(Integer chatId, String jwt) throws Exception {
		Chat chat = findChatById(chatId);
		User user = getUserById(jwt);

		boolean userInChat = chat.getUsers().stream().anyMatch(chatUser -> chatUser.getId().equals(user.getId()));

		if (userInChat) {
			chat.getDeletedByUsers().add(user.getId());
			chatRepository.save(chat);

			// Optionally delete chat if no users are left
			if (chat.getDeletedByUsers().size() == chat.getUsers().size()) {
				chatRepository.delete(chat);
			}
			return "Chat Deleted Successfully";
		}

		throw new Exception("You don't have access to delete this chat");
	}

	private static final String url = "http://USER-SERVICE/api/users/req";

	@Override
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
