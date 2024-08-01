package com.usermicroservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.usermicroservice.DTO.UserDto;
import com.usermicroservice.entity.Post;
import com.usermicroservice.entity.User;

public class UserTest {

    private User user;

    @BeforeEach
    public void setUp() {
        user = new User();
        user.setId(1);
        user.setUsername("testuser");
        user.setEmail("test@example.com");
        user.setName("Test User");
        user.setMobile("1234567890");
        user.setWebsite("https://example.com");
        user.setBio("Test bio");
        user.setGender("Male");
        user.setImage("profile.jpg");
        user.setDateOfBirth(LocalDate.of(1990, 1, 1));
        user.setPassword("password");
        user.setFollowing(new HashSet<>());
        user.setSavedPost(new ArrayList<>());
        user.setFollower(new HashSet<>());
        user.setFollowers(new ArrayList<>());
    }

    @Test
    public void testNoArgsConstructorAndGetters() {
        User noArgsUser = new User();
        assertNotNull(noArgsUser);
        noArgsUser.setId(1);
        noArgsUser.setUsername("testuser");
        noArgsUser.setEmail("test@example.com");
        noArgsUser.setName("Test User");
        noArgsUser.setMobile("1234567890");
        noArgsUser.setWebsite("https://example.com");
        noArgsUser.setBio("Test bio");
        noArgsUser.setGender("Male");
        noArgsUser.setImage("profile.jpg");
        noArgsUser.setDateOfBirth(LocalDate.of(1990, 1, 1));
        noArgsUser.setPassword("password");
        noArgsUser.setFollower(new HashSet<>());
        noArgsUser.setFollowing(new HashSet<>());
        noArgsUser.setSavedPost(new ArrayList<>());
        noArgsUser.setFollowers(new ArrayList<>());

        assertEquals(1, noArgsUser.getId());
        assertEquals("testuser", noArgsUser.getUsername());
        assertEquals("test@example.com", noArgsUser.getEmail());
        assertEquals("Test User", noArgsUser.getName());
        assertEquals("1234567890", noArgsUser.getMobile());
        assertEquals("https://example.com", noArgsUser.getWebsite());
        assertEquals("Test bio", noArgsUser.getBio());
        assertEquals("Male", noArgsUser.getGender());
        assertEquals("profile.jpg", noArgsUser.getImage());
        assertEquals(LocalDate.of(1990, 1, 1), noArgsUser.getDateOfBirth());
        assertEquals("password", noArgsUser.getPassword());
        assertNotNull(noArgsUser.getFollower());
        assertNotNull(noArgsUser.getFollowing());
        assertNotNull(noArgsUser.getSavedPost());
        assertNotNull(noArgsUser.getFollowers());
    }

    @Test
    public void testAllArgsConstructor() {
        List<Post> savedPost = new ArrayList<>();
        List<String> followers = new ArrayList<>();
        User allArgsUser = new User(1, "testuser", "test@example.com", "Test User", "1234567890", "https://example.com",
                                    "Test bio", "Male", "profile.jpg", LocalDate.of(1990, 1, 1), "password",
                                    savedPost, followers);

        assertNotNull(allArgsUser);
        assertEquals(1, allArgsUser.getId());
        assertEquals("testuser", allArgsUser.getUsername());
        assertEquals("test@example.com", allArgsUser.getEmail());
        assertEquals("Test User", allArgsUser.getName());
        assertEquals("1234567890", allArgsUser.getMobile());
        assertEquals("https://example.com", allArgsUser.getWebsite());
        assertEquals("Test bio", allArgsUser.getBio());
        assertEquals("Male", allArgsUser.getGender());
        assertEquals("profile.jpg", allArgsUser.getImage());
        assertEquals(LocalDate.of(1990, 1, 1), allArgsUser.getDateOfBirth());
        assertEquals("password", allArgsUser.getPassword());
        assertEquals(savedPost, allArgsUser.getSavedPost());
        assertEquals(followers, allArgsUser.getFollowers());
    }

    @Test
    public void testCustomConstructor() {
        List<String> followers = new ArrayList<>();
        User customUser = new User("testuser", followers);

        assertNotNull(customUser);
        assertEquals("testuser", customUser.getUsername());
        assertEquals(followers, customUser.getFollowers());
    }

    @Test
    public void testSetters() {
        Set<UserDto> newFollower = new HashSet<>();
        Set<UserDto> newFollowing = new HashSet<>();
        List<Post> newSavedPost = new ArrayList<>();

        user.setId(2);
        user.setUsername("newuser");
        user.setEmail("newuser@example.com");
        user.setName("New User");
        user.setMobile("9876543210");
        user.setWebsite("https://newexample.com");
        user.setBio("New bio");
        user.setGender("Female");
        user.setImage("newprofile.jpg");
        user.setDateOfBirth(LocalDate.of(1995, 6, 15));
        user.setPassword("newpassword");
        user.setFollower(newFollower);
        user.setFollowing(newFollowing);
        user.setSavedPost(newSavedPost);
        user.setFollowers(new ArrayList<>());

        assertEquals(2, user.getId());
        assertEquals("newuser", user.getUsername());
        assertEquals("newuser@example.com", user.getEmail());
        assertEquals("New User", user.getName());
        assertEquals("9876543210", user.getMobile());
        assertEquals("https://newexample.com", user.getWebsite());
        assertEquals("New bio", user.getBio());
        assertEquals("Female", user.getGender());
        assertEquals("newprofile.jpg", user.getImage());
        assertEquals(LocalDate.of(1995, 6, 15), user.getDateOfBirth());
        assertEquals("newpassword", user.getPassword());
        assertEquals(newFollower, user.getFollower());
        assertEquals(newFollowing, user.getFollowing());
        assertEquals(newSavedPost, user.getSavedPost());
        assertNotNull(user.getFollowers());
    }

    

    @Test
    public void testAdditionalConstructors() {
        // Testing constructor with all parameters
        User user1 = new User(1, "username", "email", "name", "mobile", "website", "bio", "gender", "image", LocalDate.now(), "password", new ArrayList<>(), new ArrayList<>());
        assertNotNull(user1);
        assertEquals(1, user1.getId());
        assertEquals("username", user1.getUsername());
        assertEquals("email", user1.getEmail());
        assertEquals("name", user1.getName());
        assertEquals("mobile", user1.getMobile());
        assertEquals("website", user1.getWebsite());
        assertEquals("bio", user1.getBio());
        assertEquals("gender", user1.getGender());
        assertEquals("image", user1.getImage());
        assertEquals("password", user1.getPassword());
        assertNotNull(user1.getSavedPost());
        assertNotNull(user1.getFollowers());

        // Testing constructor with username and followers
        List<String> followers = new ArrayList<>();
        followers.add("follower1");
        followers.add("follower2");
        User user2 = new User("username", followers);
        assertNotNull(user2);
        assertEquals("username", user2.getUsername());
        assertEquals(followers, user2.getFollowers());
    }
}