package com.axis.team09.IST.HeHe.user.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.axis.team09.IST.HeHe.user.entity.Chat;
import com.axis.team09.IST.HeHe.user.entity.Message;
import com.axis.team09.IST.HeHe.user.entity.User;
import com.axis.team09.IST.HeHe.user.repo.Chatrepository;
import com.axis.team09.IST.HeHe.user.repo.MessageRepository;

@Service
public class MessageServicImpl implements MessageService {
	@Autowired
	MessageRepository repo;
	@Autowired
	ChatService ser;
	
	@Autowired
	Chatrepository chatrepo;
	@Override
	public Message createMessage(User user, Integer chatId, Message req) throws Exception {
		// TODO Auto-generated method stub
		Chat chat=ser.findChatByid(chatId);
		Message mess=new Message();
		mess.setChat(chat);
		mess.setContent(req.getContent());
		mess.setImage(req.getImage());
		mess.setUser(user);
		mess.setTimeStamp(LocalDateTime.now());
		
		
		Message saved= repo.save(mess);
		chat.getMessage().add(saved);
		chatrepo.save(chat);
		return saved ;
	}

	@Override
	public List<Message> findMessage(Integer chatId) throws Exception {

	Chat  chat=ser.findChatByid(chatId);
	
		
		return repo.findByChatId(chatId);
	}

}
