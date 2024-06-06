package com.axis.team09.IST.HeHe.user.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.axis.team09.IST.HeHe.user.entity.Chat;
import com.axis.team09.IST.HeHe.user.entity.Post;
import com.axis.team09.IST.HeHe.user.entity.User;


public interface ChatService {
	public Chat createChat(User requser,User user) throws Exception;

	
	public List<Chat> findUsersChat(Integer userId) throws Exception;
	
	public Chat findChatByid(Integer chatId) throws Exception;
	
	
}
