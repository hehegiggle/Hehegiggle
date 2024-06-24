package com.axis.messageservice.service;

import java.util.List;

import com.axis.messageservice.entity.Message;
import com.axis.messageservice.entity.User;

public interface MessageService {
	
	public Message createMessage(User user, Integer chatId, Message req) throws Exception;
	
	public List<Message> findChatsMessages(Integer chatId) throws Exception;
	
	
	
	

}
