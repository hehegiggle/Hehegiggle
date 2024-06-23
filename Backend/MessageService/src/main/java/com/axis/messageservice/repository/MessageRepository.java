package com.axis.messageservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.axis.messageservice.entity.Message;


public interface MessageRepository extends JpaRepository<Message, Integer>{

	public List<Message> findByChatId(Integer chatId);
}
