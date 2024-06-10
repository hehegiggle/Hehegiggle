package com.HeHe.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.HeHe.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

}
