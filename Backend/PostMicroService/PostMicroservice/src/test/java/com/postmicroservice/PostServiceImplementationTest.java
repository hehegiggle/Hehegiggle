package com.postmicroservice;

import com.postmicroservice.dto.UserDto;
import com.postmicroservice.entity.Comments;
import com.postmicroservice.entity.Post;
import com.postmicroservice.entity.User;
import com.postmicroservice.exception.PostException;
import com.postmicroservice.exception.UserException;
import com.postmicroservice.repository.PostRepository;
import com.postmicroservice.service.PostServiceImplementation;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

public class PostServiceImplementationTest {

    private static final String USER_SERVICE_URL = null;

	@InjectMocks
    private PostServiceImplementation postService;

    @Mock
    private PostRepository postRepo;

    @Mock
    private RestTemplate restTemplate;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreatePost() throws UserException {
        Post post = new Post();
        String token = "dummyToken";
        User user = new User();
        when(restTemplate.exchange(anyString(), any(HttpMethod.class), any(HttpEntity.class), eq(User.class)))
                .thenReturn(new ResponseEntity<>(user, HttpStatus.OK));
        when(postRepo.save(any(Post.class))).thenReturn(post);

        Post createdPost = postService.createPost(post, token);

        assertNotNull(createdPost);
        verify(postRepo, times(1)).save(post);
    }

    @Test
    public void testFindPostByUserId() throws UserException {
        Integer userId = 1;
        List<Post> posts = Arrays.asList(new Post(), new Post());
        when(postRepo.findByUserId(userId)).thenReturn(posts);

        List<Post> foundPosts = postService.findPostByUserId(userId);

        assertEquals(posts.size(), foundPosts.size());
        verify(postRepo, times(1)).findByUserId(userId);
    }

    @Test
    public void testFindePostById() throws PostException {
        String postId = "postId";
        Post post = new Post();
        when(postRepo.findById(postId)).thenReturn(Optional.of(post));

        Post foundPost = postService.findePostById(postId);

        assertNotNull(foundPost);
        verify(postRepo, times(1)).findById(postId);
    }

    @Test
    public void testFindAllPost() throws PostException {
        List<Post> posts = Arrays.asList(new Post(), new Post());
        when(postRepo.findAll()).thenReturn(posts);

        List<Post> foundPosts = postService.findAllPost();

        assertEquals(posts.size(), foundPosts.size());
        verify(postRepo, times(1)).findAll();
    }

    @Test
    public void testLikePost() throws UserException, PostException {
        String postId = "postId";
        String token = "dummyToken";
        User user = new User();
        UserDto userDto = new UserDto("username", "name", "image", "email", 1);
        Post post = new Post();
        when(restTemplate.exchange(anyString(), any(HttpMethod.class), any(HttpEntity.class), eq(User.class)))
                .thenReturn(new ResponseEntity<>(user, HttpStatus.OK));
        when(postRepo.findById(postId)).thenReturn(Optional.of(post));
        when(postRepo.save(any(Post.class))).thenReturn(post);

        Post likedPost = postService.likePost(postId, token);

        assertNotNull(likedPost);
        verify(postRepo, times(1)).save(post);
    }

    @Test
    public void testUnLikePost() throws UserException, PostException {
        String postId = "postId";
        String token = "dummyToken";
        User user = new User();
        UserDto userDto = new UserDto("username", "name", "image", "email", 1);
        Post post = new Post();
        when(restTemplate.exchange(anyString(), any(HttpMethod.class), any(HttpEntity.class), eq(User.class)))
                .thenReturn(new ResponseEntity<>(user, HttpStatus.OK));
        when(postRepo.findById(postId)).thenReturn(Optional.of(post));
        when(postRepo.save(any(Post.class))).thenReturn(post);

        Post unlikedPost = postService.unLikePost(postId, token);

        assertNotNull(unlikedPost);
        verify(postRepo, times(1)).save(post);
    }

   


    @Test
    public void testFindAllPostByUserIds() throws PostException, UserException {
        List<Integer> userIds = Arrays.asList(1, 2, 3);
        List<Post> posts = Arrays.asList(new Post(), new Post());
        when(postRepo.findAllPostByUserIds(userIds)).thenReturn(posts);

        List<Post> foundPosts = postService.findAllPostByUserIds(userIds);

        assertEquals(posts.size(), foundPosts.size());
        verify(postRepo, times(1)).findAllPostByUserIds(userIds);
    }
   
 

    @Test
    public void testEditPost() throws PostException {
        Post post = new Post();
        post.setId("postId");
        post.setCaption("New Caption");
        post.setLocation("New Location");
        Post existingPost = new Post();
        when(postRepo.findById(anyString())).thenReturn(Optional.of(existingPost));
        when(postRepo.save(any(Post.class))).thenReturn(post);

        Post editedPost = postService.editPost(post, 1);

        assertEquals("New Caption", editedPost.getCaption());
        assertEquals("New Location", editedPost.getLocation());
        verify(postRepo, times(1)).save(existingPost);
    }

    


    @Test
    public void testAddcommentPost() {
        String postId = "postId";
        String token = "dummyToken";
        List<Comments> comments = Arrays.asList(new Comments(), new Comments());
        Post post = new Post();
        post.setCommentIds(new ArrayList<>());
        when(restTemplate.exchange(anyString(), any(HttpMethod.class), any(HttpEntity.class), ArgumentMatchers.<ParameterizedTypeReference<List<Comments>>>any()))
                .thenReturn(new ResponseEntity<>(comments, HttpStatus.OK));
        when(postRepo.findById(postId)).thenReturn(Optional.of(post));
        when(postRepo.save(any(Post.class))).thenReturn(post);

        ResponseEntity<List<Comments>> response = postService.AddcommentPost(postId, token);

        assertNotNull(response);
        assertEquals(comments.size(), post.getCommentIds().size());
        verify(postRepo, times(1)).save(post);
    }

    private User getUserById(String jwt) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", jwt);
        HttpEntity<User> entity = new HttpEntity<>(headers);
        ResponseEntity<User> response = restTemplate.exchange(USER_SERVICE_URL + "req", HttpMethod.GET, entity, User.class);
        return response.getBody();
    }

    private void saveUser(User user, String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token);
        HttpEntity<User> entity = new HttpEntity<>(user, headers);
        restTemplate.exchange(USER_SERVICE_URL + "add", HttpMethod.POST, entity, User.class);
    }

    private UserDto convertToUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setEmail(user.getEmail());
        userDto.setUsername(user.getUsername());
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setImage(user.getImage());
        return userDto;
    }
}

