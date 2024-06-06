package com.axis.team09.IST.HeHe.user.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.axis.team09.IST.HeHe.user.entity.Chat;
import com.axis.team09.IST.HeHe.user.entity.User;
import com.axis.team09.IST.HeHe.user.repo.Chatrepository;

@Service
public class ChatServiceIml implements ChatService {
	@Autowired
	Chatrepository repo;
	
	@Autowired
	UserServicee serv;

	@Override
	public Chat createChat(User requser, User user) throws Exception {
		
		Chat isExist=repo.findChatByUsersId(user, requser);
		if(isExist!=null) {
			return isExist;
		}
		Chat chat=new Chat();
		chat.getUsers().add(user);
		chat.getUsers().add(requser);
		chat.setTimestamp(LocalDateTime.now());
		return repo.save(chat);
	}

	@Override
	public List<Chat> findUsersChat(Integer userId) throws Exception {
		// TODO Auto-generated method stub
		return repo.findByUsersId(userId);
	
	}

	@Override
	public Chat findChatByid(Integer chatId) throws Exception {
		// TODO Auto-generated method stub
		Chat chat =repo.findById(chatId).get();
		return chat;
	}

}
