package com.postmicroservice.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.postmicroservice.entity.Comments;
import com.postmicroservice.entity.Post;
import com.postmicroservice.entity.User;
import com.postmicroservice.exception.PostException;
import com.postmicroservice.exception.UserException;

public interface PostService {

	public Post createPost(Post post, String token) throws UserException;

	public Post editPost(Post post, Integer userId) throws PostException;

	public String deletePost(String postId, String token) throws UserException, PostException;

	public List<Post> findPostByUserId(Integer userId) throws UserException;

	public Post findePostById(String postId) throws PostException;

	public List<Post> findAllPost() throws PostException;

	public List<Post> findAllPostByUserIds(List<Integer> userIds) throws PostException, UserException;

	public String savedPost(String postId, String token) throws PostException, UserException;

	public String unSavePost(String postId, String token) throws PostException, UserException;

	public Post likePost(String postId, String token) throws UserException, PostException;

	public Post unLikePost(String postId, String token) throws UserException, PostException;

	public User getUserById(String token);

	public ResponseEntity<List<Comments>> AddcommentPost(String id, String token);

}
