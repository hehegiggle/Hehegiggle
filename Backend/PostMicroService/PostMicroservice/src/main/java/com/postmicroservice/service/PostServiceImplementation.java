package com.postmicroservice.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.postmicroservice.dto.CommentDto;
import com.postmicroservice.dto.UserDto;
import com.postmicroservice.entity.Comments;
import com.postmicroservice.entity.Post;
import com.postmicroservice.entity.User;
import com.postmicroservice.exception.PostException;
import com.postmicroservice.exception.UserException;
import com.postmicroservice.repository.PostRepository;

@Service
public class PostServiceImplementation implements PostService {

//	@Autowired
//	private UserService userService;

	@Autowired
	private PostRepository postRepo;

//	@Autowired
//	private UserRepository userRepo;

	@Autowired
	private RestTemplate restTemplate;
	@Override
	public Post createPost(Post post, String token) throws UserException {
        // Fetch user details using token
        User user = getUserById(token);

        // Set user details to the post
        post.setUserId(user.getId());
        post.setUserEmail(user.getEmail());
        post.setUserUsername(user.getUsername());
        post.setUserImage(user.getImage());
        post.setUserName(user.getName());
        post.setCreatedAt(LocalDateTime.now());
        Post p=postRepo.save(post);
        
        
      //  savepostforuser(token,p);
        return p;
    }

	
	

	@Override
	public List<Post> findPostByUserId(Integer userId) throws UserException {
		System.out.println("ifffffff"+userId);
		List<Post> posts = postRepo.findByUserId(userId);

		return posts;
	}

	@Override
	public Post findePostById(String id) throws PostException {
		Optional<Post> opt = postRepo.findById(id);
		if (opt.isPresent()) {
			return opt.get();
		}
		throw new PostException("Post not exist with id: " + id);
	}

	@Override
	public List<Post> findAllPost() throws PostException {
		List<Post> posts = postRepo.findAll();
		if (posts.size() > 0) {
			return posts;
		}
		throw new PostException("Post Not Exist");
	}

	@Override
	public Post likePost(String postId, String token) throws UserException, PostException {
		// TODO Auto-generated method stub

		User user = getUserById(token);

		UserDto userDto = new UserDto();

		userDto.setEmail(user.getEmail());
		userDto.setUsername(user.getUsername());
		userDto.setId(user.getId());
		userDto.setName(user.getName());
		userDto.setImage(user.getImage());

		Post post = findePostById(postId);
		post.getLikedByUsers().add(userDto);
		
		

		return postRepo.save(post);

	}

	@Override
	public Post unLikePost(String postId, String token) throws UserException, PostException {
		// TODO Auto-generated method stub

		User user = getUserById(token);
		UserDto userDto = new UserDto();

		userDto.setEmail(user.getEmail());
		userDto.setUsername(user.getUsername());
		userDto.setId(user.getId());
		userDto.setName(user.getName());
		userDto.setImage(user.getImage());

		Post post = findePostById(postId);
		post.getLikedByUsers().remove(userDto);
		
		
		

		return postRepo.save(post);
	}

	@Override
	public String deletePost(String postId, String token) throws UserException, PostException {
		// TODO Auto-generated method stub

		Post post = findePostById(postId);

		User user = getUserById(token);
	
		if (post.getUserId().equals(user.getId())) {
			System.out.println("inside delete");
			postRepo.deleteById(postId);

			return "Post Deleted Successfully";
		}

		throw new PostException("You Dont have access to delete this post");

	}

	@Override
	public List<Post> findAllPostByUserIds(List<Integer> userIds) throws PostException, UserException {

		List<Post> posts = postRepo.findAllPostByUserIds(userIds);

		if (posts.size() == 0) {
			throw new PostException("No Post Available of your followings");
		}

		return posts;
	}
	@Override
	 public String savedPost(String postId, String token) throws PostException, UserException {
	        Post post = findePostById(postId);
	        User user = getUserById(token);

	        if (!user.getSavedPost().contains(post)) {
	            user.getSavedPost().add(post);
	            savepostforuser(token, user);
	            return "Post Saved Successfully";
	        }

	        return "Post is already saved";
	    }

	
	


	
	@Override
	public Post editPost(Post post, Integer userId) throws PostException {
		Post isPost = findePostById(String.valueOf(post.getId()));

		if (post.getCaption() != null) {
			isPost.setCaption(post.getCaption());
		}
		if (post.getLocation() != null) {
			isPost.setLocation(post.getLocation());
		}
		//savepostforuser(null, post);
		return postRepo.save(isPost);
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
//
	String url1 = "http://USER-SERVICE/api/users/add";

	public User savepostforuser(String jwt, User user) {
		System.out.println("----" + user);
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", jwt);

		// Create an HttpEntity with the post object and the headers
		HttpEntity<User> entity = new HttpEntity<>(user, headers);
      System.out.println("user sednded"+user);
		// Make the request and get the response
		ResponseEntity<User> response = restTemplate.exchange(url1, HttpMethod.POST, entity, User.class);

		return response.getBody();

	}
	
	
	String url2 = "http://USER-SERVICE/api/users/addpost";
	public Post savepostforuser(String jwt,Post post) {
		HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", jwt);

        // Create an HttpEntity with the post object and the headers
        HttpEntity<Post> entity = new HttpEntity<>(post, headers);
        System.out.println("as"+post);
        // Make the request and get the response
        ResponseEntity<Post> response = restTemplate.exchange(url2, HttpMethod.POST, entity, Post.class);

        // Return the response body
        return response.getBody();
	}
	
	@Override
	public String unSavePost(String postId, String token) throws PostException, UserException {
	    Post post = findePostById(postId);
	    User user = getUserById(token);

	    if (user.getSavedPost().contains(post)) {
	        // Remove the post from user's saved posts
	        user.getSavedPost().remove(post);

	        // Save the updated user
	        savepostforuser(token,user);

	        // Make a call to user service to update the user's saved posts
	        unsavePostForUser(token, post);
	    }
	  
	    return "Post Removed Successfully";
	}

	String url3 = "http://USER-SERVICE/api/users/remove";
	public Post unsavePostForUser(String jwt, Post post) {
	    HttpHeaders headers = new HttpHeaders();
	    headers.set("Authorization", jwt);

	    // Create an HttpEntity with the post object and the headers
	    HttpEntity<Post> entity = new HttpEntity<>(post, headers);

	    // Make the request and get the response
	    ResponseEntity<Post> response = restTemplate.exchange(url3, HttpMethod.POST, entity, Post.class);

	    // Return the response body
	    return response.getBody();
	}
//	private static String ur2 = "http://COMMENT-SERVICE/api/comments/post/";
//
//	@Override
//	public ResponseEntity<List<Comments>> AddcommentPost(String id, String jwt) {
//	    // Assuming ur2 is properly initialized before this point
//	    String url = ur2 + id;
//
//	    // Create HTTP headers and set the Authorization header with the JWT
//	    HttpHeaders headers = new HttpHeaders();
//	    headers.set("Authorization", jwt);
//
//	    // Create an HTTP entity with the headers
//	    HttpEntity<Comments> entity = new HttpEntity<>(headers);
//
//	    // Make a GET request to the external service
//	    try {
//	        ResponseEntity<List<Comments>> response = restTemplate.exchange(url, HttpMethod.GET, entity, new ParameterizedTypeReference<List<Comments>>() {});
//	        System.out.println(response);  // Debugging statement to log the response
//
////	        // Extract the list of comments from the response
//       List<Comments> comments = response.getBody();
////
//	        // Convert List<Comments> to List<CommentDto>
////	        List<CommentDto> commentDtos = comments.stream()
////	            .map(this::convertToDto)
////	            .collect(Collectors.toList());
//
//	        // Assuming you have a Post object to set the comments to
//	        Post post =postRepo.findById(id).get();
//	        post.setComments(comments);
//	        postRepo.save(post);
//	        savepostforuser(jwt, post);
//	        System.out.println("updated post"+post);
//
//	        return response;
//	    } catch (Exception e) {
//	        // Log the exception
//	        System.err.println("Error occurred while fetching comments: " + e.getMessage());
//	        return null;
//	    }
//	}
//
////	// Helper method to convert Comments to CommentDto
//	private CommentDto convertToDto(Comments comment) {
//	    CommentDto dto = new CommentDto();
//	    // Assuming CommentDto has similar fields to Comments
//	    dto.setId(comment.getCommentId());
//	    
//	    dto.setText(comment.getText());
//	    dto.setAuthor(comment.getAuthor());
//	    // Set other fields as necessary
//	    return dto;
//	}

		

	
	}
