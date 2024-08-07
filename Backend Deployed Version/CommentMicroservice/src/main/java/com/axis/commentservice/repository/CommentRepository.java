package com.axis.commentservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.axis.commentservice.entity.Comments;


public interface CommentRepository extends JpaRepository<Comments, Integer> {
	

    @Query("SELECT c FROM Comments c WHERE c.post.id = :postId")
    List<Comments> findCommentsByPostId(@Param("postId") String postId);

}
