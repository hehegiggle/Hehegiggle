package com.axis.commentservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.axis.commentservice.entity.Comments;
import com.axis.commentservice.entity.User;
import com.axis.commentservice.exception.CommentException;
import com.axis.commentservice.exception.PostException;
import com.axis.commentservice.exception.UserException;
import com.axis.commentservice.response.MessageResponse;
import com.axis.commentservice.service.CommentService;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

	@Autowired
	private CommentService commentService;

//	@Autowired
//	private UserService userService;

	@Autowired
	private RestTemplate restTemplate;

	@PostMapping("/create/{postId}")
	public ResponseEntity<Comments> createCommentHandler(@RequestBody Comments comment,
			@PathVariable("postId") String postId, @RequestHeader("Authorization") String token)
			throws PostException, UserException {

		Comments createdComment = commentService.createComment(comment, postId, token);

		System.out.println("created comment c--- " + createdComment.getContent());

		return new ResponseEntity<Comments>(createdComment, HttpStatus.CREATED);

	}

	@PutMapping("/like/{commentId}")
	public ResponseEntity<Comments> likeCommentHandler(@PathVariable Integer commentId,
			@RequestHeader("Authorization") String token) throws UserException, CommentException {
		System.out.println("----------- like comment id ---------- ");
		Comments likedComment = commentService.likeComment(commentId, token);
		System.out.println("liked comment - : " + likedComment);
		return new ResponseEntity<Comments>(likedComment, HttpStatus.OK);
	}

	
	
	@PutMapping("/unlike/{commentId}")
	public ResponseEntity<Comments> unlikeCommentHandler(@RequestHeader("Authorization") String token,
			@PathVariable Integer commentId) throws UserException, CommentException {
		System.out.println("----------- unlikelike comment id ---------- ");
		Comments unlikedComment = commentService.unlikeComment(commentId, token);
		System.out.println("unliked comment - : " + unlikedComment);
		return new ResponseEntity<Comments>(unlikedComment, HttpStatus.OK);
	}

	@PutMapping("/edit/{commentId}")
	public ResponseEntity<MessageResponse> editCommentHandler(
	        @PathVariable Integer commentId,
	        @RequestBody Comments updatedComment,
	        @RequestHeader("Authorization") String token) throws CommentException {
	    
	        
			System.out.println("COmment entered");
	        // Call the service method to edit the comment
	        commentService.editComment(updatedComment,commentId,token );

	        // Prepare success response
	        MessageResponse res = new MessageResponse("Comment Updated Successfully");
	        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
	    
	}



	@DeleteMapping("/delete/{commentId}")
	public ResponseEntity<MessageResponse> deleteCommentHandler(@PathVariable Integer commentId,
	        @RequestHeader("Authorization") String token) {
	    try {
	    	System.out.println("CommentId "+ commentId);
	        commentService.deleteCommentById(commentId,token); // Ensure this method correctly deletes the comment
	        MessageResponse res = new MessageResponse("Comment Deleted Successfully");
	        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
	    } catch (CommentException e) {
	        // Log the exception
	        System.err.println("Error deleting comment: " + e.getMessage());
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}



	@GetMapping("/post/{postId}")
	public ResponseEntity<List<Comments>> getCommentHandler(@PathVariable String postId, @RequestHeader("Authorization") String token)
	        throws CommentException, PostException {

	    try {
	        List<Comments> comments = commentService.findCommentByPostId(postId);
	       System.out.println("got ttttttt"+comments);
	        return new ResponseEntity<>(comments, HttpStatus.ACCEPTED);
	    } catch (Exception e) {
	        // Log the exception
	        System.err.println("Error occurred while fetching comments: " + e.getMessage());
	        // Return an appropriate response entity
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}}

//