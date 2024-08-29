package com.axis.messageservice.service;

import java.util.List;

import com.axis.messageservice.entity.Chat;
import com.axis.messageservice.entity.User;

public interface ChatService {

	public Chat getExistingChat(User user1, User user2);

	public Chat createChat(User reqUser, User user2) throws Exception;

	public Chat findChatById(Integer chatId) throws Exception;

	public List<Chat> findUsersChat(Integer userId, boolean includeDeleted);

	public String deleteUserChat(Integer chatId, String jwt) throws Exception;

	public User getUserById(String token);
}
