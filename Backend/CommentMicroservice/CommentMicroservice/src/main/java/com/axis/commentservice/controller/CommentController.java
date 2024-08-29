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
import com.axis.commentservice.exception.CommentException;
import com.axis.commentservice.exception.PostException;
import com.axis.commentservice.exception.ReelException;
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

	// Create Reel Comment
	@PostMapping("/create/reel/{reelId}")
	public ResponseEntity<Comments> createReelComment(@RequestBody Comments comment,
			@PathVariable("reelId") Integer reelId, @RequestHeader("Authorization") String token)
			throws ReelException, UserException {

		Comments createdReelComment = commentService.createReelComment(comment, reelId, token);

		return new ResponseEntity<Comments>(createdReelComment, HttpStatus.OK);
	}

	@PutMapping("/like/{commentId}")
	public ResponseEntity<Comments> likeCommentHandler(@PathVariable("commentId") Integer commentId,
			@RequestHeader("Authorization") String token) throws UserException, CommentException {
		System.out.println("----------- like comment id ---------- ");
		Comments likedComment = commentService.likeComment(commentId, token);
		System.out.println("liked comment - : " + likedComment);
		return new ResponseEntity<Comments>(likedComment, HttpStatus.OK);
	}

	// Like Reel Comment
	@PutMapping("/like/reel/{commentId}")
	public ResponseEntity<Comments> likeReelComment(@PathVariable("commentId") Integer commentId,
			@RequestHeader("Authorization") String token) throws UserException, CommentException {

		Comments likedComment = commentService.likeReelComment(commentId, token);

		return new ResponseEntity<Comments>(likedComment, HttpStatus.OK);
	}

	@PutMapping("/unlike/{commentId}")
	public ResponseEntity<Comments> unlikeCommentHandler(@RequestHeader("Authorization") String token,
			@PathVariable("commentId") Integer commentId) throws UserException, CommentException {

		Comments likedComment = commentService.unlikeComment(commentId, token);

		return new ResponseEntity<Comments>(likedComment, HttpStatus.OK);
	}

	// Dislike reel comment like
	@PutMapping("/dislike/reel/{commentId}")
	public ResponseEntity<Comments> dislikeReelComment(@PathVariable("commentId") Integer commentId,
			@RequestHeader("Authorization") String token) throws UserException, CommentException {
		
		Comments dislikedComment = commentService.dislikeReelComment(commentId, token);

		return new ResponseEntity<Comments>(dislikedComment, HttpStatus.OK);
	}

	@PutMapping(value = "/edit/{commentId}", consumes = "application/json")
	public ResponseEntity<MessageResponse> editCommentHandler(@PathVariable("commentId") Integer commentId,
			@RequestBody Comments comment) throws CommentException {
		commentService.editComment(comment, commentId);

		MessageResponse res = new MessageResponse("Comment Updated Successfully");
		System.out.println("Comments changed: " + comment);
		return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
	}

	// Update Reel Comment
	@PutMapping("/edit/reel/{commentId}")
	public ResponseEntity<MessageResponse> editReelComment(@PathVariable("commentId") Integer commentId,
			@RequestBody Comments comment, @RequestHeader("Authorization") String token)
			throws CommentException, UserException, ReelException {

		commentService.editReelComment(comment, commentId, token);
		MessageResponse res = new MessageResponse("Reel Comment Updated Successfully");
		return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
	}

	@DeleteMapping("/delete/{commentId}")
	public ResponseEntity<MessageResponse> deleteCommentHandler(@PathVariable("commentId") Integer commentId)
			throws CommentException {

		commentService.deleteCommentById(commentId);

		MessageResponse res = new MessageResponse("Comment Delete Successfully");

		return new ResponseEntity<MessageResponse>(res, HttpStatus.ACCEPTED);
	}

	// Delete Reel Comment
	@DeleteMapping("/delete/reel/{commentId}")
	public ResponseEntity<MessageResponse> deleteReelComment(@PathVariable("commentId") Integer commentId,
			@RequestHeader("Authorization") String token) throws CommentException, UserException {
		
		commentService.deleteReelCommentById(commentId, token);
		MessageResponse res = new MessageResponse("Reel Comment Delete Successfully");

		return new ResponseEntity<MessageResponse>(res, HttpStatus.ACCEPTED);
	}

	@GetMapping("/post/{postId}")
	public ResponseEntity<List<Comments>> getCommentHandler(@PathVariable("postId") String postId,
			@RequestHeader("Authorization") String token) throws CommentException, PostException {

		try {
			List<Comments> comments = commentService.findCommentByPostId(postId);
			System.out.println("got ttttttt" + comments);
			return new ResponseEntity<>(comments, HttpStatus.ACCEPTED);
		} catch (Exception e) {
			// Log the exception
			System.err.println("Error occurred while fetching comments: " + e.getMessage());
			// Return an appropriate response entity
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// Get All Comments of a Reel
	@GetMapping("/reel/{reelId}")
	public ResponseEntity<List<Comments>> getReelAllComments(@PathVariable("reelId") Integer reelId,
			@RequestHeader("Authorization") String token) throws CommentException, UserException {
		
		try {
			List<Comments> comments = commentService.findCommentByReelId(reelId, token);
			return new ResponseEntity<>(comments, HttpStatus.ACCEPTED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
