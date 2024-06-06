package com.axis.team09.IST.HeHe.user.service;

import java.util.List;

import com.axis.team09.IST.HeHe.user.entity.Post;

public interface PostService {
	public Post createpost(Post post,Integer id) throws Exception;

	public String deletePost(Integer id, Integer postId)  throws Exception;
	
	public List<Post> findPostByUserId(Integer id)  throws Exception;
	
	public List<Post> findAllPost() throws Exception;
	
	public Post findPostByid(Integer PostId) throws Exception;
	
	public Post savePost(Integer postId, Integer  userId) throws Exception, Exception;
	
	public Post likedPost(Integer postId,Integer userId)  throws Exception;
}
