package com.axis.team09.IST.HeHe.user.contoller;


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

import com.axis.team09.IST.HeHe.response.Apiesponse;
import com.axis.team09.IST.HeHe.user.entity.Post;
import com.axis.team09.IST.HeHe.user.entity.User;
import com.axis.team09.IST.HeHe.user.service.PostService;
import com.axis.team09.IST.HeHe.user.service.UserServiceImp;
import com.axis.team09.IST.HeHe.user.service.UserServicee;



@RestController // for creating RESTful API's contain requstbody+controller
@RequestMapping("/api")
public class PostsController {

	@Autowired
	PostService postService;
	
	@Autowired
	UserServicee ser;
	
	@PostMapping("/addposts")
	public ResponseEntity<Post>createPost(@RequestBody Post post, @RequestHeader("Authorization") String jwt) throws Exception{
		User loggeduser=ser.findByJwtToken(jwt);
    	
		
		Post createdPost = postService.createpost(post, loggeduser.getId());
		return new ResponseEntity<>(createdPost, HttpStatus.ACCEPTED);
	}
	
	@DeleteMapping("/delete/{postId}")
	public ResponseEntity<Apiesponse>deletePost(@PathVariable Integer postId,  @RequestHeader("Authorization") String jwt) throws Exception{
		//Post createdPost = postService.createpost(post, userId);
		User loggeduser=ser.findByJwtToken(jwt);
    	
		
		String message=postService.deletePost(loggeduser.getId(), postId);
		Apiesponse res=new Apiesponse(message,true);
		
		return new ResponseEntity<Apiesponse>(res, HttpStatus.OK);
	}
	
	@GetMapping("/posts/{postId}")
	public ResponseEntity<Post>getPostById(@PathVariable Integer postId) throws Exception{
		Post post = postService.findPostByid(postId);
		return new ResponseEntity<Post>(post, HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/posts/user/{userId}")
	public ResponseEntity<List<Post>>getPostByUserId(@PathVariable Integer userId) throws Exception{
		List<Post> post = postService.findPostByUserId(userId);
		return new ResponseEntity<List<Post>>(post, HttpStatus.OK);
	}
	
	@GetMapping("/posts")
	public ResponseEntity<List<Post>>getPosts() throws Exception{
		List<Post> post = postService.findAllPost();
		return new ResponseEntity<List<Post>>(post, HttpStatus.OK);
	}
	
	@PutMapping("/posts/{postId}")
	public ResponseEntity<Post>savedpost(@PathVariable Integer postId,  @RequestHeader("Authorization") String jwt) throws Exception{
		User loggeduser=ser.findByJwtToken(jwt);
    	
		Post post = postService.savePost(postId, loggeduser.getId());
		return new ResponseEntity<Post>(post, HttpStatus.ACCEPTED);
	}
	

	@PutMapping("/posts/like/{postId}")
	public ResponseEntity<Post>likedpost(@PathVariable Integer postId, @RequestHeader("Authorization") String jwt) throws Exception{
		User loggeduser=ser.findByJwtToken(jwt);
    	
		Post post = postService.likedPost(postId, loggeduser.getId());
		return new ResponseEntity<Post>(post, HttpStatus.ACCEPTED);
	}
	
	
	
	
	
	
	
	
}