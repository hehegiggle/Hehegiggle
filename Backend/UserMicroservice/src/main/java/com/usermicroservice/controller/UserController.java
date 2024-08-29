package com.usermicroservice.controller;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.usermicroservice.DTO.UserDto;
import com.usermicroservice.Event.NotificationEvent;
import com.usermicroservice.entity.Post;
import com.usermicroservice.entity.User;
import com.usermicroservice.exception.UserException;
import com.usermicroservice.repository.PostRepository;
import com.usermicroservice.repository.UserRepository;
import com.usermicroservice.response.MessageResponse;
import com.usermicroservice.service.NotificationService;
import com.usermicroservice.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PostRepository postRepository;

	@Autowired
	private NotificationService notificationService;

	@GetMapping("id/{id}")
	public ResponseEntity<User> findUserByIdHandler(@PathVariable("id") Integer id) throws UserException {

		User user = userService.findUserById(id);

		return new ResponseEntity<User>(user, HttpStatus.OK);
	}

	@GetMapping("username/{username}")
	public ResponseEntity<User> findByUsernameHandler(@PathVariable("username") String username) throws UserException {

		User user = userService.findUserByUsername(username);

		return new ResponseEntity<User>(user, HttpStatus.ACCEPTED);

	}

	@PutMapping("/follow/{followUserId}")
	public ResponseEntity<MessageResponse> followUserHandler(@RequestHeader("Authorization") String token,
			@PathVariable("followUserId") Integer followUserId) throws UserException {
		User reqUser = userService.findUserProfile(token);

		String message = userService.followUser(reqUser.getId(), followUserId);
		MessageResponse res = new MessageResponse(message);

//		User followUserDetails = userService.findUserById(followUserId);
//		System.out.println("Details-----"+followUserDetails);

//		// Send Notification
//		NotificationEvent notificationEvent = new NotificationEvent(null, // notificationId, will be generated
//				"follow request", reqUser.getId().toString(), null, null, // commentId, not applicable
//				followUserId.toString(), +" started following you", LocalDateTime.now());
//
//		notificationService.sendNotification(notificationEvent);

		return new ResponseEntity<MessageResponse>(res, HttpStatus.OK);
	}

	@PutMapping("/unfollow/{unfollowUserId}")
	public ResponseEntity<MessageResponse> unfollowUserHandler(@RequestHeader("Authorization") String token,
			@PathVariable("unfollowUserId") Integer unfollowUserId) throws UserException {

		User reqUser = userService.findUserProfile(token);

		String message = userService.unfollowUser(reqUser.getId(), unfollowUserId);
		MessageResponse res = new MessageResponse(message);
		return new ResponseEntity<MessageResponse>(res, HttpStatus.OK);
	}

	@GetMapping("/req")
	public ResponseEntity<User> findUserProfileHandler(@RequestHeader("Authorization") String token)
			throws UserException {

		System.out.println("Got it");
		User user = userService.findUserProfile(token);

		return new ResponseEntity<User>(user, HttpStatus.ACCEPTED);

	}

	@GetMapping("/m/{userIds}")
	public ResponseEntity<List<User>> findAllUsersByUserIdsHandler(@PathVariable("userIds") List<Integer> userIds) {
		List<User> users = userService.findUsersByUserIds(userIds);

		System.out.println("userIds ------ " + userIds);
		return new ResponseEntity<List<User>>(users, HttpStatus.ACCEPTED);

	}

	@GetMapping("/search")
	public ResponseEntity<List<User>> searchUserHandler(@RequestParam("q") String query) throws UserException {

		List<User> users = userService.searchUser(query);

		return new ResponseEntity<List<User>>(users, HttpStatus.OK);
	}

	@PutMapping("/account/edit")
	public ResponseEntity<User> updateUser(@RequestHeader("Authorization") String token, @RequestBody User user)
			throws UserException {

		User reqUser = userService.findUserProfile(token);
		User updatedUser = userService.updateUserDetails(user, reqUser);

		return new ResponseEntity<User>(updatedUser, HttpStatus.OK);

	}

	@GetMapping("/populer")
	public ResponseEntity<List<User>> populerUsersHandler() {

		List<User> populerUsers = userService.popularUser();

		return new ResponseEntity<List<User>>(populerUsers, HttpStatus.OK);

	}

	@PostMapping("/add")
	public User createUserHandler(@RequestBody User updatedUser, @RequestHeader("Authorization") String token)
			throws UserException {
		System.out.println("u " + updatedUser);
		Post post = new Post();
		Set<Post> list = updatedUser.getSavedPost();
		Set<Post> savedPost = new HashSet<>();

		System.out.println("got the list " + list);
		for (Post post1 : list) {
			post.setId(post1.getId());
			String a = post1.getId();
			post.setCaption(post1.getCaption());
			post.setImage(post1.getImage());
			post.setLocation(post1.getLocation());
			post.setUser(post1.getUser());
			post.setCreatedAt(post1.getCreatedAt());
			post.setLikedByUsers(post1.getLikedByUsers());
			postRepository.save(post);
			savedPost.add(post);
		}

		System.out.println("got the post " + savedPost);
		updatedUser.setSavedPost(list);
		User u = userRepository.save(updatedUser);

		return u;
	}

	@GetMapping("/saved/{id}")
	public Post removesavedpostHandler(@RequestHeader("Authorization") String token, @PathVariable("id") String id)
			throws UserException {

		// List<User> populerUsers = userService.popularUser();

		User u = userService.removeSavedPost(token, id);
		Post post = postRepository.findById(id).get();
		return post;

	}

	@PostMapping("/addpost")
	public Post addpost(@RequestHeader("Authorization") String token, @RequestBody Post post) throws UserException {

		userService.addpost(token, post);

		return post;
	}

	@GetMapping("/follower-list/{userId}")
	public Set<UserDto> getAllFollowers(@PathVariable("userId") Integer userId,
			@RequestHeader("Authorization") String token) throws UserException {
		System.out.println("FOLLOWER GOT USERID---------------------" + userId);
		return userService.getAllFollowers(userId, token);
	}

	@GetMapping("/following-list/{userId}")
	public Set<UserDto> getAllFollowings(@PathVariable("userId") Integer userId,
			@RequestHeader("Authorization") String token) throws UserException {
		System.out.println("FOLLOWING GOT USERID---------------------" + userId);
		return userService.getAllFollowings(userId, token);
	}
}
