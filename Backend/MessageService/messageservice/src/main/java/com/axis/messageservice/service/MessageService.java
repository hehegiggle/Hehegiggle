package com.axis.messageservice.service;

import java.util.List;

import com.axis.messageservice.entity.Message;
import com.axis.messageservice.entity.User;

public interface MessageService {
	
	public Message createMessage(User user, Integer chatId, Message req) throws Exception;
	
	public List<Message> findChatsMessages(Integer chatId, String jwt) throws Exception;
	
	public String deleteAllMessages(Integer chatId, String jwt) throws Exception;
	
	public void deleteMessageById(Integer messageId, String jwt) throws Exception;
	
	public Message findMessagesByChatId(Integer chatId) throws Exception;

	User getUserById(String jwt);

}
