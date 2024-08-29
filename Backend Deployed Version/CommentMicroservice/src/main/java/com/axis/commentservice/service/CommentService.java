package com.axis.commentservice.service;

import java.util.List;

import com.axis.commentservice.entity.Comments;
import com.axis.commentservice.entity.Post;
import com.axis.commentservice.entity.User;
import com.axis.commentservice.exception.CommentException;
import com.axis.commentservice.exception.PostException;
import com.axis.commentservice.exception.ReelException;
import com.axis.commentservice.exception.UserException;

public interface CommentService {

	public Comments createComment(Comments comment, String postId, String token) throws PostException, UserException;

	public Comments findCommentById(Integer commentId) throws CommentException;

	public Comments likeComment(Integer CommentId, String token) throws UserException, CommentException;

	public Comments unlikeComment(Integer CommentId, String token) throws UserException, CommentException;

	public String deleteCommentById(Integer commentId) throws CommentException;

	public String editComment(Comments comment, Integer commentId) throws CommentException;

	public List<Comments> findCommentByPostId(String postId) throws PostException;

	User getUserById(String jwt);

	Post getPostById(String jwt, String id);

	public Comments createReelComment(Comments comment, Integer reelId, String token)
			throws ReelException, UserException;

	public String editReelComment(Comments comment, Integer commentId, String token)
			throws CommentException, UserException, ReelException;

	public String deleteReelCommentById(Integer commentId, String token) throws CommentException, UserException;

	public List<Comments> findCommentByReelId(Integer reelId, String token) throws CommentException, UserException;

	public Comments likeReelComment(Integer commentId, String token) throws CommentException, UserException;

	public Comments dislikeReelComment(Integer commentId, String token) throws CommentException, UserException;
}
