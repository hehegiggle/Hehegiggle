package com.axis.team09.IST.HeHe.user.service;

import java.util.List;

import com.axis.team09.IST.HeHe.user.entity.Comment;
import com.axis.team09.IST.HeHe.user.entity.Post;

public interface CommentService {
	public Comment createComment(Comment comm,Integer postid,Integer userid) throws Exception;
	
	public Comment findById(Integer CommentId) throws Exception;
	
	
	public Comment likedComment(Integer commentId,Integer userId)  throws Exception;
}
