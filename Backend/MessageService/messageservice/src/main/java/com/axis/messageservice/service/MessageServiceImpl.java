package com.axis.messageservice.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.axis.messageservice.entity.Chat;
import com.axis.messageservice.entity.Message;
import com.axis.messageservice.entity.User;
import com.axis.messageservice.event.NotificationEvent;
import com.axis.messageservice.repository.ChatRepository;
import com.axis.messageservice.repository.MessageRepository;

@Service
public class MessageServiceImpl implements MessageService {

	@Autowired
	private MessageRepository messageRepository;

	@Autowired
	private ChatService chatService;

	@Autowired
	private ChatRepository chatRepository;

	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private NotificationService notificationService;

	@Override
	public Message createMessage(User user, Integer chatId, Message req) throws Exception {
		Chat chat = chatService.findChatById(chatId);

		Message message = new Message();
		message.setChat(chat);
		message.setContent(req.getContent());
		message.setSentImage(req.getSentImage());
		message.setSentVideo(req.getSentVideo());
		message.setSentGif(req.getSentGif());
		message.setUser(user);
		message.setTimestamp(LocalDateTime.now());

		Message savedMessage = messageRepository.save(message);

		chat.getMessages().add(savedMessage);
		chatRepository.save(chat);

		// Check the time difference between the last message and the current message
		List<Message> chatMessages = messageRepository.findByChatId(chatId, Sort.by(Sort.Direction.DESC, "timestamp"));
		if (chatMessages.size() > 1) {
			Message lastMessage = chatMessages.get(1); // The second most recent message
			Duration timeDiff = Duration.between(lastMessage.getTimestamp(), savedMessage.getTimestamp());

			if (timeDiff.getSeconds() > 120) {
				User receivingUser = chat.getUsers().stream().filter(u -> !u.getId().equals(user.getId())).findFirst()
						.orElse(null);

				if (receivingUser != null) {
					NotificationEvent notificationEvent = new NotificationEvent(null, // notificationId, will be
																						// generated
							"Message Sent", receivingUser.getId().toString(), null, null, null, // commentId, not
																								// applicable
							user.getId().toString(), user.getUsername() + " sent you a message", LocalDateTime.now());

					notificationService.sendNotification(notificationEvent);
				}
			}
		}

		return savedMessage;
	}

	@Override
	public List<Message> findChatsMessages(Integer chatId, String jwt) throws Exception {
		List<Message> messages = messageRepository.findByChatId(chatId, Sort.by(Sort.Direction.ASC, "timestamp"));
		User user = getUserById(jwt);

		// Filter out messages marked as deleted by the requesting user
		return messages.stream().filter(message -> !message.getDeletedUsers().contains(user.getId()))
				.collect(Collectors.toList());
	}

	@Override
	public String deleteAllMessages(Integer chatId, String jwt) throws Exception {
		Chat chat = chatService.findChatById(chatId);
		User user = getUserById(jwt);

		boolean userInChat = chat.getUsers().stream().anyMatch(u -> u.getId().equals(user.getId()));
		if (userInChat) {
			chat.getMessages().forEach(message -> message.getDeletedUsers().add(user.getId()));
			messageRepository.saveAll(chat.getMessages());
			return "All Messages Deleted Successfully";
		} else {
			throw new Exception("You don't have access to delete messages");
		}
	}

	@Override
	public void deleteMessageById(Integer messageId, String jwt) throws Exception {

		Optional<Message> optMessage = messageRepository.findById(messageId);
		User user = getUserById(jwt);

		if (optMessage.isEmpty()) {
			throw new Exception("Message not found with the id: " + messageId);
		}

		Message message = optMessage.get();

		LocalDateTime now = LocalDateTime.now();
		LocalDateTime messageDelTime = message.getTimestamp();

		long timeDiff = Duration.between(messageDelTime, now).getSeconds();

		boolean userInChat = message.getChat().getUsers().stream().anyMatch(u -> u.getId().equals(user.getId()));

		if (!userInChat) {
			throw new Exception("You don't have access to delete the message");
		}

		if (timeDiff < 20) {
			System.out.println("Time diff less than 20sec.....");
			messageRepository.delete(message);
		} else {
			System.out.println("Time diff greater than 20sec.....");
			message.getDeletedUsers().add(user.getId());
			messageRepository.save(message);
		}
	}

	@Override
	public Message findMessagesByChatId(Integer chatId) throws Exception {

		Optional<Message> opt = messageRepository.findById(chatId);

		if (opt.isEmpty()) {
			throw new Exception("Messages not found with Id " + chatId);
		}

		return opt.get();
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
