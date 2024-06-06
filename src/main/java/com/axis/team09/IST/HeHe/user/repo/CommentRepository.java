package com.axis.team09.IST.HeHe.user.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.axis.team09.IST.HeHe.user.entity.Comment;
import com.axis.team09.IST.HeHe.user.entity.User;


public interface CommentRepository extends JpaRepository<Comment, Integer>{
	


	

}
