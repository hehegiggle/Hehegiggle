package com.HeHe.service;

import java.util.List;

import com.HeHe.entity.Post;

public interface PostService {

	Post createNewPost(Post post, Integer userId)throws Exception;

	String deletePost(Integer postId,Integer userId) throws Exception;
	
	List<Post>findPostByUserId(Integer userId);
	
	Post findPostById(Integer postId) throws Exception;
	
	List<Post>findAllPost();
	
	Post savedPost(Integer postId,Integer userId) throws Exception;
	
	Post likePost(Integer postId,Integer userId) throws Exception;
	
}
