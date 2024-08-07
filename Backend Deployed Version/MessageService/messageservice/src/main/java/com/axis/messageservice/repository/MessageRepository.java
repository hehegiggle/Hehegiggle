package com.axis.messageservice.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.axis.messageservice.entity.Message;

public interface MessageRepository extends JpaRepository<Message, Integer> {

	@Query("SELECT m FROM Message m WHERE m.chat.id = ?1")
	public List<Message> findByChatId(Integer chatId, Sort sort);
}
