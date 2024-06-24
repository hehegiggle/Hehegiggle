package com.axis.messageservice.service;

import java.util.List;

import com.axis.messageservice.entity.Chat;
import com.axis.messageservice.entity.User;


public interface ChatService {
	
	public Chat createChat(User reqUser, User user2);
	
	public Chat findChatById(Integer chatId) throws Exception;
	
	public List<Chat> findUsersChat(Integer userId);

}
