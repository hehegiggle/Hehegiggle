package com.axis.commentservice.service;

import java.time.LocalDateTime;
import org.springframework.http.HttpEntity;

import java.util.*;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.axis.commentservice.dto.AddCommentRequest;
import com.axis.commentservice.dto.CommentDto;
import com.axis.commentservice.dto.UserDto;
import com.axis.commentservice.entity.Comments;
import com.axis.commentservice.entity.Post;
import com.axis.commentservice.entity.Reel;
import com.axis.commentservice.entity.User;
import com.axis.commentservice.event.NotificationEvent;
import com.axis.commentservice.exception.CommentException;
import com.axis.commentservice.exception.PostException;
import com.axis.commentservice.exception.ReelException;
import com.axis.commentservice.exception.UserException;
import com.axis.commentservice.repository.CommentRepository;

@Service
public class CommentsServiceImplement implements CommentService {

	@Autowired
	private CommentRepository repo;

	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private NotificationService notificationService;

	@Override
	public Comments createComment(Comments comment, String postId, String token) throws PostException, UserException {

		User user = getUserById(token);
		System.out.println("post Id in create comment " + postId);
		Post post = getPostById(token, postId);

		// TODO Auto-generated method stub

		UserDto userDto = new UserDto();
		userDto.setEmail(user.getEmail());
		userDto.setId(user.getId());
		userDto.setUsername(user.getUsername());
		userDto.setName(user.getName());
		userDto.setUserimage(user.getImage());

		comment.setUserDto(userDto);
		comment.setCreatedAt(LocalDateTime.now());

		comment.setPost(post);
		comment.setLikedByUsers(new HashSet<>());

		Comments newComment = repo.save(comment);

		post.getComments().add(newComment);
		System.out.println("post " + newComment);
		// CommentDto commentDto = mapper.map(newComment, CommentDto.class);
		System.out.println("cgouuuuuuuuuuu " + post);
		savecommentsforuser(token, post);

		// Send Notification
		NotificationEvent notificationEvent = new NotificationEvent(null, // notificationId, will be generated
				"Post Comment", post.getUserId().toString(), post.getId(), null, comment.getCommentId().toString(),
				user.getId().toString(), user.getUsername() + " commented on your post", LocalDateTime.now());

		if (!post.getUserId().toString().equals(user.getId().toString())) {
			notificationService.sendNotification(notificationEvent);
			System.out.println("Notification event:---------------- " + notificationEvent);
			return newComment;
		} else {
			return newComment;
		}
	}

	private static final String ReelURL = "http://REEL-SERVICE/api/reels/get-reel/";

	// Create reel comment
	@Override
	public Comments createReelComment(Comments comment, Integer reelId, String token)
			throws ReelException, UserException {

		String url = ReelURL + reelId;

		User user = getUserById(token);
		if (user == null) {
			throw new UserException("User not found!!!");
		}

		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", token);

		HttpEntity<Void> entity = new HttpEntity<>(headers);
		ResponseEntity<Reel> response = restTemplate.exchange(url, HttpMethod.GET, entity, Reel.class);

		Reel reel = response.getBody();
		System.out.println("REEL FROM REEL-SERVICE-------" + reel);

		if (reel == null) {
			throw new ReelException("Reel with Id " + reelId + " not found!!!");
		}

		UserDto userDto = new UserDto();

		userDto.setId(user.getId());
		userDto.setName(user.getName());
		userDto.setUsername(user.getUsername());
		userDto.setUserimage(user.getImage());
		userDto.setEmail(user.getEmail());

		// Set user and reel details in comment table

		comment.setUserDto(userDto);
		comment.setCreatedAt(LocalDateTime.now());
		comment.setReel(reel);
		comment.setLikedByUsers(new HashSet<>());

		Comments newComment = repo.save(comment);

		// Send Notification
		NotificationEvent notificationEvent = new NotificationEvent(null, "Reel Comment",
				reel.getUser().getId().toString(), null, reel.getId(), newComment.getCommentId().toString(),
				user.getId().toString(), user.getUsername() + " commented on your reel", LocalDateTime.now());
		if (!reel.getUser().getId().equals(user.getId())) {
			notificationService.sendNotification(notificationEvent);
		}

		return newComment;
	}

	@Override
	public Comments findCommentById(Integer commentId) throws CommentException {
		Optional<Comments> opt = repo.findById(commentId);

		if (opt.isPresent()) {
			return opt.get();
		}
		throw new CommentException("comment not exist with id : " + commentId);
	}

	@Override
	public Comments likeComment(Integer commentId, String token) throws UserException, CommentException {
		// TODO Auto-generated method stub

		User user = getUserById(token);
		Comments comment = findCommentById(commentId);

		UserDto userDto = new UserDto();
		userDto.setEmail(user.getEmail());
		userDto.setId(user.getId());
		userDto.setUsername(user.getUsername());
		userDto.setName(user.getName());
		userDto.setUserimage(user.getImage());

		comment.getLikedByUsers().add(userDto);
		System.out.println(("like ------- " + " ------ " + comment));

		// Send Notification
		NotificationEvent notificationEvent = new NotificationEvent(null, // notificationId, will be generated
				"Post Comment Like", comment.getUserDto().getId().toString(), null, null,
				comment.getCommentId().toString(), user.getId().toString(),
				user.getUsername() + " liked your post comment", LocalDateTime.now());

		if (!comment.getUserDto().getId().equals(user.getId())) {
			notificationService.sendNotification(notificationEvent);
			return repo.save(comment);
		} else {
			return repo.save(comment);
		}
	}

	// Like Reel Comment
	@Override
	public Comments likeReelComment(Integer commentId, String token) throws CommentException, UserException {

		User user = getUserById(token);
		if (user == null) {
			throw new UserException("User not found!!!");
		}

		Comments getComment = findCommentById(commentId);
		if (getComment == null) {
			throw new CommentException("Comment not found!!!");
		}

		UserDto userDto = new UserDto();
		userDto.setEmail(user.getEmail());
		userDto.setId(user.getId());
		userDto.setUsername(user.getUsername());
		userDto.setName(user.getName());
		userDto.setUserimage(user.getImage());

		getComment.getLikedByUsers().add(userDto);

		// Send Notification
		NotificationEvent notificationEvent = new NotificationEvent(null, // notificationId, will be generated
				"Reel Comment Like", getComment.getUserDto().getId().toString(), null, null,
				getComment.getCommentId().toString(), user.getId().toString(),
				user.getUsername() + " liked your reel comment", LocalDateTime.now());

		if (!getComment.getUserDto().getId().equals(user.getId())) {
			notificationService.sendNotification(notificationEvent);
			return repo.save(getComment);
		} else {
			return repo.save(getComment);
		}
	}

	@Override
	public Comments unlikeComment(Integer commentId, String token) throws UserException, CommentException {
		User user = getUserById(token);
		Comments comment = findCommentById(commentId);

		Set<UserDto> set = new HashSet<>();
		UserDto u = new UserDto();
		u.setEmail(user.getEmail());
		u.setId(user.getId());
		u.setName(user.getName());
		u.setUserimage(user.getImage());
		u.setUsername(user.getUsername());
		comment.getLikedByUsers().remove(u);
		System.out.println("got comment " + comment);
		return repo.save(comment);

	}

	// Dislike Reel Comment Like
	public Comments dislikeReelComment(Integer commentId, String token) throws CommentException, UserException {

		User user = getUserById(token);
		if (user == null) {
			throw new UserException("User not found!!!");
		}

		Comments getComment = findCommentById(commentId);
		if (getComment == null) {
			throw new CommentException("Comment not found!!!");
		}
		UserDto u = new UserDto();
		u.setEmail(user.getEmail());
		u.setId(user.getId());
		u.setName(user.getName());
		u.setUserimage(user.getImage());
		u.setUsername(user.getUsername());
		getComment.getLikedByUsers().remove(u);

		return repo.save(getComment);
	}

	@Override
	public String deleteCommentById(Integer commentId) throws CommentException {
		Comments comment = findCommentById(commentId);

		System.out.println("find by id delete-------- " + comment.getContent());

		repo.deleteById(comment.getCommentId());

		return "Comment Deleted Successfully";
	}

	// Delete Reel Comment
	public String deleteReelCommentById(Integer commentId, String token) throws CommentException, UserException {
		User user = getUserById(token);
		if (user == null) {
			throw new UserException("User not found!!!");
		}

		Comments getComment = findCommentById(commentId);
		if (getComment == null) {
			throw new CommentException("Comment not found!!!");
		}

		repo.deleteById(getComment.getCommentId());

		return "Reel Comment Deleted Successfully";

	}

	@Override
	public String editComment(Comments comment, Integer commentId) throws CommentException {
		Comments isComment = findCommentById(commentId);

		if (comment.getContent() != null) {
			isComment.setContent(comment.getContent());
		}
		repo.save(isComment);
		return "Comment Updated Successfully";
	}

	// Update Reel Comment
	@Override
	public String editReelComment(Comments comment, Integer commentId, String token)
			throws CommentException, UserException, ReelException {

		User user = getUserById(token);
		if (user == null) {
			throw new UserException("User not found!!!");
		}

		Comments getComment = findCommentById(commentId);
		if (getComment == null) {
			throw new CommentException("Comment not found!!!");
		}

		if (getComment.getContent() != null) {
			getComment.setContent(comment.getContent());
		}

		repo.save(getComment);
		return "Reel Comment Updated Successfully";
	}

	@Override
	public List<Comments> findCommentByPostId(String postId) throws PostException {
		List<Comments> comments = repo.findCommentsByPostId(postId);
		System.out.println("Comments-------" + comments);
		return comments;
	}

	// Find Comment By ReelID

	public List<Comments> findCommentByReelId(Integer reelId, String token) throws CommentException, UserException {
		User user = getUserById(token);
		if (user == null) {
			throw new UserException("User not found!!!");
		}

		List<Comments> comments = repo.findCommentByReelId(reelId);

		if (comments.isEmpty()) {
			throw new CommentException("Comments Not Found!!!");
		}
		return comments;
	}

	private static final String url = "http://USER-SERVICE/api/users/req";

	@Override
	public User getUserById(String jwt) {
		System.out.println("token +" + jwt);
		HttpHeaders headers = new HttpHeaders();

		headers.set("Authorization", jwt);
		HttpEntity<User> entity = new HttpEntity<>(headers);

		ResponseEntity<User> response = restTemplate.exchange(url, HttpMethod.GET, entity, User.class);
		System.out.println("got user+" + response);
		return response.getBody();
	}

	private static final String BASE_URL = "http://POST-SERVICE/api/posts/";

	@Override
	public Post getPostById(String jwt, String id) {
		String url = BASE_URL + id;
		System.out.println("Token: " + jwt);
		System.out.println("URL: " + url);

		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", jwt);

		HttpEntity<Void> entity = new HttpEntity<>(headers);

		ResponseEntity<Post> response = restTemplate.exchange(url, HttpMethod.GET, entity, Post.class);
		System.out.println("Received response: " + response);

		return response.getBody();
	}

//	String url2 = "http://POST-SERVICE/api/posts/addcomment";
//
//	public Post savePostForUser(CommentDto comment, String postId, String jwt) {
//	    HttpHeaders headers = new HttpHeaders();
//	    headers.set("Authorization", jwt);
//	    headers.setContentType(MediaType.APPLICATION_JSON);
//
//	    // Create the request object
//	    AddCommentRequest request = new AddCommentRequest();
//	    request.setComment(comment);
//	    request.setPostId(postId);
//        System.out.println("request " + request);
//	    // Create an HttpEntity with the request object and headers
//	    HttpEntity<AddCommentRequest> entity = new HttpEntity<>(request, headers);
//
//	    // Make the request and get the response
//	    ResponseEntity<Post> response = restTemplate.exchange(url2, HttpMethod.POST, entity, Post.class);
//
//	    // Return the response body
//	    return response.getBody();
//	}

//	String url3 = "http://USER-SERVICE/api/users/addpost";
//	public Post savepostforuser(String jwt,Post post) {
//		HttpHeaders headers = new HttpHeaders();
//        headers.set("Authorization", jwt);
//
//        // Create an HttpEntity with the post object and the headers
//        HttpEntity<Post> entity = new HttpEntity<>(post, headers);
//        System.out.println("as"+post);
//        // Make the request and get the response
//        ResponseEntity<Post> response = restTemplate.exchange(url2, HttpMethod.POST, entity, Post.class);
//
//        // Return the response body
//        return response.getBody();
//	}

	private static String url4 = "http://POST-SERVICE/api/posts/addpostcomment";

	public Post savecommentsforuser(String jwt, Post post) {
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", jwt);
		System.out.println("get comments " + post.getComments());
//        int commid =0;
//        List<Comments>comm=post.getComments();
//        for(Comments comments:comm) {
//        	commid=comments.getCommentId();
//        	
//        }
//        System.out.println("got id"+commid);

		HttpEntity<Post> entity = new HttpEntity<>(post, headers);

		// Make the request and get the response
		ResponseEntity<Post> response = restTemplate.exchange(url4, HttpMethod.POST, entity, Post.class);

		// Create an HttpEntity with the post object and the headers
		System.out.println("as GET SET GO " + post);

		// Return the response body
		return post;
	}

}
