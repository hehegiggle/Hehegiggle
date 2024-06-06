package com.axis.team09.IST.HeHe.user.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.axis.team09.IST.HeHe.user.entity.Message;


public interface MessageRepository extends JpaRepository<Message, Integer>{
	
	public List<Message> findByChatId(Integer id);

	

}
