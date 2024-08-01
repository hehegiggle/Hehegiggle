package com.usermicroservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import java.util.HashSet;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.usermicroservice.DTO.UserDto;
import com.usermicroservice.config.JwtGenratorFilter;
import com.usermicroservice.entity.Post;
import com.usermicroservice.entity.User;
import com.usermicroservice.exception.UserException;
import com.usermicroservice.repository.PostRepository;
import com.usermicroservice.repository.UserRepository;
import com.usermicroservice.service.UserServiceImplementation;

public class UserServiceImplementationTest {

    private UserServiceImplementation userService;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JwtGenratorFilter jwtGenratorFilter;
    private PostRepository postRepository;


    @BeforeEach
    void setUp() {
        userRepository = mock(UserRepository.class);
        passwordEncoder = mock(PasswordEncoder.class);
        jwtGenratorFilter = mock(JwtGenratorFilter.class);
        postRepository = mock(PostRepository.class);
        userService = new UserServiceImplementation(userRepository, postRepository, passwordEncoder, jwtGenratorFilter);
    }

    @Test
    void testRegisterUser_Success() throws UserException {
        // Create a new user with all required fields
        User user = new User();
        user.setUsername("testuser");
        user.setEmail("testuser@example.com");
        user.setName("Test User");
        user.setPassword("password");

        // Mock repository methods
        when(userRepository.findByEmail("testuser@example.com")).thenReturn(Optional.empty());
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("password")).thenReturn("encodedPassword");
        when(userRepository.save(any())).thenReturn(user);

        // Call the registerUser method
        User result = userService.registerUser(user);

        // Assert the result
        assertEquals("testuser", result.getUsername());
    }




    @Test
    void testRegisterUser_EmailAlreadyExists() {
        User user = new User(null, "testuser", "testuser@example.com", "Test User", "password", null, null, null, null, null, null, null, null, new ArrayList<>(), new ArrayList<>());

        when(userRepository.findByEmail("testuser@example.com")).thenReturn(Optional.of(user));

        // Verify exception
        assertThrows(UserException.class, () -> userService.registerUser(user));
    }

    @Test
    void testRegisterUser_UsernameAlreadyTaken() {
        User user = new User(null, "testuser", "testuser@example.com", "Test User", "password", null, null, null, null, null, null, null, null, new ArrayList<>(), new ArrayList<>());

        when(userRepository.findByEmail("testuser@example.com")).thenReturn(Optional.empty());
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        // Verify exception
        assertThrows(UserException.class, () -> userService.registerUser(user));
    }

    @Test
    void testRegisterUser_MissingFields() {
        User user = new User(null, null, null, null, "password", null, null, null, null, null, null, null, null, new ArrayList<>(), new ArrayList<>());

        // Verify exception
        assertThrows(UserException.class, () -> userService.registerUser(user));
    }

    @Test
    void testFindUserById_Success() throws UserException {
        User user = new User(1, "testuser", "testuser@example.com", "Test User", null, null, null, null, null, null, null, null, null, new ArrayList<>(), new ArrayList<>());

        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        User result = userService.findUserById(1);

        assertEquals("testuser", result.getUsername());
    }

    @Test
    void testFindUserById_UserNotFoundException() {
        when(userRepository.findById(1)).thenReturn(Optional.empty());

        // Verify exception
        assertThrows(UserException.class, () -> userService.findUserById(1));
    }

    @Test
    void testFollowUser_Success() throws UserException {
        // Mock data
        User reqUser = new User(1, "reqUser", "requser@example.com", "Req User", null, null, null, null, null, null, null, null, null, new HashSet<>(), new HashSet<>());
        User followUser = new User(2, "followUser", "followuser@example.com", "Follow User", null, null, null, null, null, null, null, null, null, new HashSet<>(), new HashSet<>());

        // Initialize follower and following sets
        reqUser.setFollowing(new HashSet<>());
        followUser.setFollower(new HashSet<>());

        when(userRepository.findById(1)).thenReturn(Optional.of(reqUser));
        when(userRepository.findById(2)).thenReturn(Optional.of(followUser));

        String result = userService.followUser(1, 2);

        assertEquals("you are following followUser", "you are following followUser");
        verify(userRepository).save(reqUser);
        verify(userRepository).save(followUser);
    }



    @Test
    void testFollowUser_UserNotFoundException() {
        when(userRepository.findById(1)).thenReturn(Optional.empty());

        // Verify exception
        assertThrows(UserException.class, () -> userService.followUser(1, 2));
    }

    @Test
    void testUnfollowUser_Success() throws UserException {
        // Mock data
        User reqUser = new User(1, "reqUser", "requser@example.com", "Req User", null, null, null, null, null, null, null, null, null, new ArrayList<>(), new ArrayList<>());
        User unfollowUser = new User(2, "unfollowUser", "unfollowuser@example.com", "Unfollow User", null, null, null, null, null, null, null, null, null, new HashSet<>(), new HashSet<>());

        // Initialize follower and following sets
        unfollowUser.setFollower(new HashSet<>());
        reqUser.setFollowing(new HashSet<>());

        when(userRepository.findById(1)).thenReturn(Optional.of(reqUser));
        when(userRepository.findById(2)).thenReturn(Optional.of(unfollowUser));

        String result = userService.unfollowUser(1, 2);

        // Verify
        assertEquals("You have unfollowed Unfollow User", "You have unfollowed Unfollow User");
        verify(userRepository).save(reqUser);
        verify(userRepository).save(unfollowUser);
    }


    @Test
    void testUnfollowUser_UserNotFoundException() {
        when(userRepository.findById(1)).thenReturn(Optional.empty());

        // Verify exception
        assertThrows(UserException.class, () -> userService.unfollowUser(1, 2));
    }

    @Test
    void testFindUserProfile_Success() throws UserException {
        String jwt = "mocked.jwt.token";
        User mockUser = new User(1, "testuser", "testuser@example.com", "Test User", null, null, null, null, null, null, null, null, null, new ArrayList<>(), new ArrayList<>());

        when(jwtGenratorFilter.getEmailFromJwtToken(jwt)).thenReturn("testuser@example.com");
        when(userRepository.findByEmail("testuser@example.com")).thenReturn(Optional.of(mockUser));

        User result = userService.findUserProfile(jwt);

        assertEquals("testuser@example.com", result.getEmail());
    }

    

    @Test
    void testFindUserByUsername_Success() throws UserException {
        String username = "testuser";
        User mockUser = new User(1, "testuser", "testuser@example.com", "Test User", null, null, null, null, null, null, null, null, null, new ArrayList<>(), new ArrayList<>());

        when(userRepository.findByUsername(username)).thenReturn(Optional.of(mockUser));

        User result = userService.findUserByUsername(username);

        assertEquals("testuser", result.getUsername());
    }

    

    @Test
    void testFindUsersByUserIds_Success() {
        List<Integer> userIds = Arrays.asList(1, 2, 3);
        List<User> mockUsers = Arrays.asList(
            new User(1, "user1", "user1@example.com", "User 1", null, null, null, null, null, null, null, null, null, new ArrayList<>(), new ArrayList<>()),
            new User(2, "user2", "user2@example.com", "User 2", null, null, null, null, null, null, null, null, null, new ArrayList<>(), new ArrayList<>()),
            new User(3, "user3", "user3@example.com", "User 3", null, null, null, null, null, null, null, null, null, new ArrayList<>(), new ArrayList<>())
        );

        when(userRepository.findAllUserByUserIds(userIds)).thenReturn(mockUsers);

        List<User> result = userService.findUsersByUserIds(userIds);

        assertEquals(3, result.size());
    }
    
    
    
    @Test
    void testUnfollowUser() throws UserException {
        // Mock data
        User reqUser = new User(1, "reqUser", "requser@example.com", "Req User", null, null, null, null, null, null, null, null, null, new ArrayList<>(), new ArrayList<>());
        User unfollowUser = new User(2, "unfollowUser", "unfollowuser@example.com", "Unfollow User", null, null, null, null, null, null, null, null, null, new HashSet<>(), new HashSet<>());

        // Initialize follower and following sets
        unfollowUser.setFollower(new HashSet<>());
        reqUser.setFollowing(new HashSet<>());

        when(userRepository.findById(1)).thenReturn(Optional.of(reqUser));
        when(userRepository.findById(2)).thenReturn(Optional.of(unfollowUser));

        String result = userService.unfollowUser(1, 2);

        // Verify
        assertEquals("You have unfollowed Unfollow User", "You have unfollowed Unfollow User");
    }


    

    @Test
    void testFindUserProfile() throws UserException {
        String jwt = "mocked.jwt.token";
        User mockUser = new User(1, "testuser", "testuser@example.com", "Test User", null, null, null, null, null, null, null, null, null, new ArrayList<>(), new ArrayList<>());

        when(userRepository.findByEmail(any())).thenReturn(Optional.of(mockUser));

        User result = userService.findUserProfile(jwt);

        assertEquals("testuser@example.com", result.getEmail());
    }

    @Test
    void testFindUserProfile_UserNotFoundException() {
        String jwt = "mocked.jwt.token";
        when(userRepository.findByEmail(any())).thenReturn(Optional.empty());

        // Verify exception
        assertThrows(UserException.class, () -> userService.findUserProfile(jwt));
    }

    @Test
    void testFindUserByUsername() throws UserException {
        String username = "testuser";
        User mockUser = new User(1, "testuser", "testuser@example.com", "Test User", null, null, null, null, null, null, null, null, null, new ArrayList<>(), new ArrayList<>());

        when(userRepository.findByUsername(username)).thenReturn(Optional.of(mockUser));

        User result = userService.findUserByUsername(username);

        assertEquals("testuser", result.getUsername());
    }

    @Test
    void testFindUserByUsername_UserNotFoundException() {
        String username = "nonexistentuser";
        when(userRepository.findByUsername(username)).thenReturn(Optional.empty());

        // Verify exception
        assertThrows(UserException.class, () -> userService.findUserByUsername(username));
    }

    @Test
    void testFindUsersByUserIds() {
        List<Integer> userIds = Arrays.asList(1, 2, 3);
        List<User> mockUsers = Arrays.asList(
            new User(1, "user1", "user1@example.com", "User 1", null, null, null, null, null, null, null, null, null, new ArrayList<>(), new ArrayList<>()),
            new User(2, "user2", "user2@example.com", "User 2", null, null, null, null, null, null, null, null, null, new ArrayList<>(), new ArrayList<>()),
            new User(3, "user3", "user3@example.com", "User 3", null, null, null, null, null, null, null, null, null, new ArrayList<>(), new ArrayList<>())
        );

        when(userRepository.findAllUserByUserIds(userIds)).thenReturn(mockUsers);

        List<User> result = userService.findUsersByUserIds(userIds);

        assertEquals(3, result.size());
    }

    @Test
    void testSearchUser() throws UserException {
        String query = "user";
        List<User> mockUsers = Arrays.asList(
            new User(1, "user1", "user1@example.com", "User 1", null, null, null, null, null, null, null, null, null, new ArrayList<>(), new ArrayList<>()),
            new User(2, "user2", "user2@example.com", "User 2", null, null, null, null, null, null, null, null, null, new ArrayList<>(), new ArrayList<>())
        );

        when(userRepository.findByQuery(query)).thenReturn(mockUsers);

        List<User> result = userService.searchUser(query);

        assertEquals(2, result.size());
    }

    @Test
    void testSearchUser_UserNotFoundException() {
        String query = "nonexistent";
        when(userRepository.findByQuery(query)).thenReturn(new ArrayList<>());

        // Verify exception
        assertThrows(UserException.class, () -> userService.searchUser(query));
    }

    @Test
    void testUpdateUserDetails() throws UserException {
        User existingUser = new User(1, "existinguser", "existinguser@example.com", "Existing User", null, null, null, null, null, null, null, null, null, new ArrayList<>(), new ArrayList<>());
        User updatedUser = new User();
        updatedUser.setId(1);
        updatedUser.setEmail("updated@example.com");
        updatedUser.setBio("Updated bio");

        when(userRepository.save(existingUser)).thenReturn(existingUser);

        User result = userService.updateUserDetails(updatedUser, existingUser);

        assertEquals("updated@example.com", result.getEmail());
        assertEquals("Updated bio", result.getBio());
    }

    @Test
    void testUpdateUserDetails_InvalidUserId() {
        User existingUser = new User(1, "existinguser", "existinguser@example.com", "Existing User", null, null, null, null, null, null, null, null, null, new ArrayList<>(), new ArrayList<>());
        User updatedUser = new User();
        updatedUser.setId(2); // Different ID than existingUser

        // Verify exception
        assertThrows(UserException.class, () -> userService.updateUserDetails(updatedUser, existingUser));
    }

    @Test
    void testPopularUser() {
        List<User> mockUsers = Arrays.asList(
            new User(1, "user1", "user1@example.com", "User 1", null, null, null, null, null, null, null, null, null, new ArrayList<>(), new ArrayList<>()),
            new User(2, "user2", "user2@example.com", "User 2", null, null, null, null, null, null, null, null, null, new ArrayList<>(), new ArrayList<>())
        );

        when(userRepository.findAll()).thenReturn(mockUsers);

        List<User> result = userService.popularUser();

        assertEquals(2, result.size());
    }

    @Test
    void testAdd() {
        User user = new User(null, "newuser", "newuser@example.com", "New User", null, null, null, null, null, null, null, null, null, new ArrayList<>(), new ArrayList<>());

        when(userRepository.save(any())).thenReturn(user);

        User result = userService.add(user);

        assertEquals("newuser", result.getUsername());
    }

    @Test
    void testAddPost() {
        Post post = new Post(); // Create a Post object

        // Mock the repository method if needed, and verify interactions
        userService.addpost("mocked.jwt.token", post);
        // Add assertions if there are any side effects or interactions to verify
    }
    
    
    
    
    
    
    

  
}