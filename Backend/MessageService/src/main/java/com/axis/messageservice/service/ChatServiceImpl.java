package com.axis.messageservice.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.axis.messageservice.entity.Chat;
import com.axis.messageservice.entity.User;
import com.axis.messageservice.repository.ChatRepository;

@Service
public class ChatServiceImpl implements ChatService{

	@Autowired
	private ChatRepository chatRepository;
	
	
	@Override
	public Chat createChat(User reqUser, User user2) {
		System.out.println("ReqUser---------" + reqUser);
		System.out.println("User2---------" + user2);
		Chat isExist = chatRepository.findChatByUsersId(user2, reqUser);
		
		System.out.println("ReqUser---------" + reqUser);
		if(isExist!=null) {
			return isExist;
		}
		
		Chat chat = new Chat();
		chat.getUsers().add(user2);
		chat.getUsers().add(reqUser);
		chat.setTimestamp(LocalDateTime.now());
		System.out.println("chat " + chat);
		return chatRepository.save(chat);
	}

	@Override
	public Chat findChatById(Integer chatId) throws Exception {
	   Optional<Chat> opt = chatRepository.findById(chatId);
	
	   if(opt.isEmpty()) {
		   throw new Exception("Chat not found with Id " + chatId);
	   }
	   
	   return opt.get();
	}

	 @Override
	    public List<Chat> findUsersChat(Integer userId) {
	        List<Chat> chats = chatRepository.findByUsersId(userId);
	        if (chats == null || chats.isEmpty()) {
	            System.out.println("No chats found for userId: " + userId);
	        } else {
	            System.out.println("Found chats: " + chats);
	        }
	        return chats;
	    }
}
