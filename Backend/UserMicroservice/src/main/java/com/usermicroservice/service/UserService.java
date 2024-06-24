package com.usermicroservice.service;

import java.util.List;

import com.usermicroservice.entity.Post;
import com.usermicroservice.entity.User;
import com.usermicroservice.exception.UserException;

public interface UserService {

	public User registerUser(User user) throws UserException;

	public User findUserById(Integer userId) throws UserException;

	public User findUserProfile(String token) throws UserException;

	public User findUserByUsername(String username) throws UserException;

	public String followUser(Integer reqUserId, Integer followUserId) throws UserException;

	public String unfollowUser(Integer reqUserId, Integer unfollowUserId) throws UserException;

	public List<User> findUsersByUserIds(List<Integer> userIds);

	public List<User> searchUser(String query) throws UserException;

	public List<User> popularUser();

	public User updateUserDetails(User updatedUser, User existingUser) throws UserException;

	public User add(User user);

	public void addpost(String token, Post post);

	public User removeSavedPost(String token, String postId) throws UserException;

	void updatePassword(User user, String newPassword);

	void sendPasswordResetEmail(User user);
}
