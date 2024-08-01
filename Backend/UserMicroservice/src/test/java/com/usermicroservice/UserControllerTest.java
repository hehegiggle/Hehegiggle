package com.usermicroservice;

import static org.mockito.ArgumentMatchers.any;
import com.usermicroservice.entity.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.time.LocalDateTime;
import java.util.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.usermicroservice.DTO.UserDto;
import com.usermicroservice.controller.UserController;
import com.usermicroservice.entity.User;
import com.usermicroservice.exception.UserException;
import com.usermicroservice.repository.UserRepository;
import com.usermicroservice.response.MessageResponse;
import com.usermicroservice.service.UserService;
import com.usermicroservice.service.UserServiceImplementation;
import com.usermicroservice.repository.PostRepository;

@WebMvcTest(UserController.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;
    
    
    @MockBean
    private UserRepository userRepository;
    
    @MockBean
    private PostRepository postRepository;
    

    @InjectMocks
    private UserController userController;
    
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();

        // Configure ObjectMapper to support Java 8 date/time types
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
    }

    @Test
    public void testFindUserByIdHandler() throws Exception {
        User user = new User();
        user.setId(1);
        user.setUsername("testuser");

        when(userService.findUserById(1)).thenReturn(user);

        mockMvc.perform(get("/api/users/id/1"))
                .andExpect(status().isOk());
    }

    @Test
    public void testFindByUsernameHandler() throws Exception {
        User user = new User();
        user.setUsername("testuser");

        when(userService.findUserByUsername("testuser")).thenReturn(user);

        mockMvc.perform(get("/api/users/username/testuser"))
                .andExpect(status().isAccepted());
    }

    @Test
    public void testFollowUserHandler() throws Exception {
        User user = new User();
        user.setId(1);
        user.setUsername("testuser");

        when(userService.findUserProfile(any(String.class))).thenReturn(user);
        when(userService.followUser(any(Integer.class), any(Integer.class))).thenReturn("Followed successfully");

        mockMvc.perform(put("/api/users/follow/2")
                .header("Authorization", "Bearer token"))
                .andExpect(status().isOk());
    }

    @Test
    public void testUnfollowUserHandler() throws Exception {
        User user = new User();
        user.setId(1);
        user.setUsername("testuser");

        when(userService.findUserProfile(any(String.class))).thenReturn(user);
        when(userService.unfollowUser(any(Integer.class), any(Integer.class))).thenReturn("Unfollowed successfully");

        mockMvc.perform(put("/api/users/unfollow/2")
                .header("Authorization", "Bearer token"))
                .andExpect(status().isOk());
    }

    @Test
    public void testFindUserProfileHandler() throws Exception {
        User user = new User();
        user.setUsername("testuser");

        when(userService.findUserProfile(any(String.class))).thenReturn(user);

        mockMvc.perform(get("/api/users/req")
                .header("Authorization", "Bearer token"))
                .andExpect(status().isAccepted());
    }

    @Test
    public void testFindAllUsersByUserIdsHandler() throws Exception {
        User user1 = new User();
        user1.setId(1);
        user1.setUsername("user1");

        User user2 = new User();
        user2.setId(2);
        user2.setUsername("user2");

        List<User> users = Arrays.asList(user1, user2);

        when(userService.findUsersByUserIds(any(List.class))).thenReturn(users);

        mockMvc.perform(get("/api/users/m/1,2"))
                .andExpect(status().isAccepted());
    }

    @Test
    public void testSearchUserHandler() throws Exception {
        User user1 = new User();
        user1.setId(1);
        user1.setUsername("user1");

        List<User> users = Arrays.asList(user1);

        when(userService.searchUser(any(String.class))).thenReturn(users);

        mockMvc.perform(get("/api/users/search").param("q", "user"))
                .andExpect(status().isOk());
    }

    @Test
    public void testUpdateUser() throws Exception {
        User user = new User();
        user.setId(1);
        user.setUsername("testuser");

        when(userService.findUserProfile(any(String.class))).thenReturn(user);
        when(userService.updateUserDetails(any(User.class), any(User.class))).thenReturn(user);

        ObjectMapper objectMapper = new ObjectMapper();
        String userJson = objectMapper.writeValueAsString(user);

        mockMvc.perform(put("/api/users/account/edit")
                .header("Authorization", "Bearer token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(userJson))
                .andExpect(status().isOk());
    }

    @Test
    public void testPopularUsersHandler() throws Exception {
        User user1 = new User();
        user1.setId(1);
        user1.setUsername("user1");

        User user2 = new User();
        user2.setId(2);
        user2.setUsername("user2");

        List<User> users = Arrays.asList(user1, user2);

        when(userService.popularUser()).thenReturn(users);

        mockMvc.perform(get("/api/users/populer"))
                .andExpect(status().isOk());
    }
    
    
    
    @Test
    public void testCreateUserHandler_Success() throws Exception {
        // Mock data
        User user = new User(1, "testuser", "testuser@example.com", "Test User", "password", null, null, null, null, null, null, null, null, new ArrayList<>(), new ArrayList<>());
        List<Post> savedPosts = Arrays.asList(
            new Post("1", "Caption 1", "image1.jpg", "Location 1", LocalDateTime.now(), new UserDto(), new HashSet<>()),
            new Post("2", "Caption 2", "image2.jpg", "Location 2", LocalDateTime.now(), new UserDto(), new HashSet<>())
        );
        user.setSavedPost(savedPosts);

        // Mock service method
        when(userService.add(any(User.class))).thenReturn(user);

        // Convert user object to JSON
        String userJson = objectMapper.writeValueAsString(user);

        // Mock token
        String token = "mocked.token";

        // Perform POST request
        mockMvc.perform(post("/api/users/add")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(userJson))
                .andExpect(status().isOk());

        // Verify interactions and assertions
        // You can add more assertions based on your application logic
    }

    @Test
    public void testAddPost_Success() throws Exception {
        // Mock data
        User user = new User(1, "testuser", "testuser@example.com", "Test User", "password", null, null, null, null, null, null, null, null, new ArrayList<>(), new ArrayList<>());
        Post post = new Post("1", "Caption 1", "image1.jpg", "Location 1", LocalDateTime.now(), new UserDto(), new HashSet<>());

        // Mock service method
        // Assuming addpost does not return anything
        when(userService.findUserProfile(any(String.class))).thenReturn(user);

        // Convert post object to JSON
        String postJson = objectMapper.writeValueAsString(post);

        // Mock token
        String token = "mocked.token";

        // Perform POST request
        mockMvc.perform(post("/api/users/addpost")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(postJson))
                .andExpect(status().isOk());

        // Verify interactions and assertions
        // You can add more assertions based on your application logic
    }
}
