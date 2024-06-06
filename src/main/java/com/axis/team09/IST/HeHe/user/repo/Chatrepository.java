package com.axis.team09.IST.HeHe.user.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.axis.team09.IST.HeHe.user.entity.Chat;
import com.axis.team09.IST.HeHe.user.entity.Reels;
import com.axis.team09.IST.HeHe.user.entity.User;

public interface Chatrepository extends JpaRepository<Chat, Integer> {

	List<Chat> findByUsersId(Integer id);
	
	@Query("select c from Chat c Where :user Member of c.users And :requser member of c.users")
	Chat findChatByUsersId(@Param("user") User user,@Param("requser") User requser);
}

