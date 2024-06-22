package com.postmicroservice.controller;

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

import com.postmicroservice.entity.Comments;
import com.postmicroservice.entity.Post;
import com.postmicroservice.exception.UserException;
import com.postmicroservice.repository.PostRepository;
import com.postmicroservice.response.MessageResponse;
import com.postmicroservice.service.PostService;
import com.postmicroservice.exception.PostException;

@RestController
@RequestMapping("/api/posts")
public class PostController {

	@Autowired
	private PostService postService;

//	@Autowired
//	private UserService userService;

	@Autowired
	private PostRepository postRepo;

	@PostMapping("/create")
	public ResponseEntity<Post> createPostHandler(@RequestBody Post post, @RequestHeader("Authorization") String token)
			throws UserException {

		System.out.println("create post ---- " + post.getCaption());

//		User user = postService.getUserById(token);

		Post createdPost = postService.createPost(post, token);

		return new ResponseEntity<Post>(createdPost, HttpStatus.CREATED);
	}

	@GetMapping("/all/{userId}")
	public ResponseEntity<List<Post>> findPostByUserIdHandler(@PathVariable("userId") Integer userId)
			throws UserException {

		List<Post> posts = postService.findPostByUserId(userId);

		return new ResponseEntity<List<Post>>(posts, HttpStatus.OK);
	}

	@GetMapping("/following/{userIds}")
	public ResponseEntity<List<Post>> findAllPostByUserIds(@PathVariable("userIds") List<Integer> userIds)
			throws PostException, UserException {

		System.out.println("post userIds ----- " + userIds);
		List<Post> posts = postService.findAllPostByUserIds(userIds);
		System.out.println("Post sent is------" + posts);
		return new ResponseEntity<List<Post>>(posts, HttpStatus.OK);
	}

	@GetMapping("/")
	public ResponseEntity<List<Post>> findAllPostHandler() throws PostException {
		List<Post> posts = postService.findAllPost();
		System.out.println("Post sent is------" + posts);
		return new ResponseEntity<List<Post>>(posts, HttpStatus.OK);
	}

	@GetMapping("/{postId}")
	public ResponseEntity<Post> findPostByIdHandler(@PathVariable("postId") String postId,
			@RequestHeader("Authorization") String token) throws PostException {
		System.out.println("Received Post Id: " + postId);

		Post post = postService.findePostById(postId);
		if (post == null) {
			throw new PostException("Post not found with id: " + postId);
		}

		return new ResponseEntity<>(post, HttpStatus.OK);
	}

	@PutMapping("/like/{postId}")
	public ResponseEntity<Post> likePostHandler(@PathVariable("postId") String postId,
			@RequestHeader("Authorization") String token) throws UserException, PostException {

//		User user = postService.getUserById(token);

		Post updatedPost = postService.likePost(postId, token);

		return new ResponseEntity<Post>(updatedPost, HttpStatus.OK);

	}

	@PutMapping("/unlike/{postId}")
	public ResponseEntity<Post> unLikePostHandler(@PathVariable("postId") String postId,
			@RequestHeader("Authorization") String token) throws UserException, PostException {

//		User user = postService.getUserById(token);

		Post updatedPost = postService.unLikePost(postId, token);

		return new ResponseEntity<Post>(updatedPost, HttpStatus.OK);

	}

	@DeleteMapping("/delete/{postId}")
	public ResponseEntity<MessageResponse> deletePostHandler(@PathVariable String postId,
			@RequestHeader("Authorization") String token) throws UserException, PostException {

//		User user = postService.getUserById(token);

		String message = postService.deletePost(postId, token);

		MessageResponse res = new MessageResponse(message);

		return new ResponseEntity<MessageResponse>(res, HttpStatus.OK);

	}

	@PutMapping("/save_post/{postId}")
	public ResponseEntity<MessageResponse> savedPostHandler(@RequestHeader("Authorization") String token,
			@PathVariable String postId) throws UserException, PostException {

//		User user = postService.getUserById(token);
		String message = postService.savedPost(postId, token);
		MessageResponse res = new MessageResponse(message);

		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@PutMapping("/unsave_post/{postId}")
	public ResponseEntity<MessageResponse> unSavedPostHandler(@RequestHeader("Authorization") String token,
			@PathVariable String postId) throws UserException, PostException {
//		
//		User user = postService.getUserById(token);
		String message = postService.unSavePost(postId, token);
		MessageResponse res = new MessageResponse(message);

		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@PutMapping("/edit")
	public ResponseEntity<MessageResponse> editPostHandler(@RequestBody Post post) throws PostException {
		postService.editPost(post, null);
		MessageResponse res = new MessageResponse("Post Updated Succefully");
		return new ResponseEntity<MessageResponse>(res, HttpStatus.OK);
	}

@PostMapping("/addpostcomment")
	public Post addComment(@RequestBody Post post, @RequestHeader("Authorization") String token)throws UserException, PostException {
	    List<Comments> commentList = post.getCommentIds();
	   // commentList.add(request.getComment());
		
	   postService.AddcommentPost(post.getId(),token);
	    post.setCommentIds(commentList);     
	//    System.out.println(request.getComment());
		
		//Post po = postRepo.save(post);

		return post;
	}

}
