package com.axis.team09.IST.HeHe.user.service;

import java.util.List;

import com.axis.team09.IST.HeHe.user.entity.Chat;
import com.axis.team09.IST.HeHe.user.entity.Message;
import com.axis.team09.IST.HeHe.user.entity.User;


public interface MessageService {
	
	public Message createMessage(User user,Integer chatId,Message req) throws Exception;

	
	public List<Message> findMessage(Integer chatId) throws Exception;
	
	
	
	
}
