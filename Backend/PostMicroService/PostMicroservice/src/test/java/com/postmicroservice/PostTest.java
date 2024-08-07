package com.postmicroservice;

import org.junit.jupiter.api.Test;

import com.postmicroservice.dto.UserDto;
import com.postmicroservice.entity.Comments;
import com.postmicroservice.entity.Post;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class PostTest {

    @Test
    public void testNoArgsConstructor() {
        Post post = new Post();
        assertNotNull(post);
    }

    @Test
    public void testAllArgsConstructor() {
        String id = "123";
        String caption = "Test Caption";
        String image = "test.jpg";
        String location = "Test Location";
        LocalDateTime createdAt = LocalDateTime.now();
        Integer userId = 1;
        String userEmail = "user@example.com";
        String userUsername = "testuser";
        String userImage = "user.jpg";
        String userName = "Test User";
        List<Comments> commentIds = new ArrayList<>();
        Set<UserDto> likedByUsers = new HashSet<>();

        Post post = new Post(id, caption, image, location, createdAt, userId, userEmail, userUsername, userImage, userName, commentIds, likedByUsers);

        assertEquals(id, post.getId());
        assertEquals(caption, post.getCaption());
        assertEquals(image, post.getImage());
        assertEquals(location, post.getLocation());
        assertEquals(createdAt, post.getCreatedAt());
        assertEquals(userId, post.getUserId());
        assertEquals(userEmail, post.getUserEmail());
        assertEquals(userUsername, post.getUserUsername());
        assertEquals(userImage, post.getUserImage());
        assertEquals(userName, post.getUserName());
        assertEquals(commentIds, post.getCommentIds());
        assertEquals(likedByUsers, post.getLikedByUsers());
    }

    @Test
    public void testSettersAndGetters() {
        Post post = new Post();
        String id = "123";
        String caption = "Test Caption";
        String image = "test.jpg";
        String location = "Test Location";
        LocalDateTime createdAt = LocalDateTime.now();
        Integer userId = 1;
        String userEmail = "user@example.com";
        String userUsername = "testuser";
        String userImage = "user.jpg";
        String userName = "Test User";
        List<Comments> commentIds = new ArrayList<>();
        Set<UserDto> likedByUsers = new HashSet<>();

        post.setId(id);
        post.setCaption(caption);
        post.setImage(image);
        post.setLocation(location);
        post.setCreatedAt(createdAt);
        post.setUserId(userId);
        post.setUserEmail(userEmail);
        post.setUserUsername(userUsername);
        post.setUserImage(userImage);
        post.setUserName(userName);
        post.setCommentIds(commentIds);
        post.setLikedByUsers(likedByUsers);

        assertEquals(id, post.getId());
        assertEquals(caption, post.getCaption());
        assertEquals(image, post.getImage());
        assertEquals(location, post.getLocation());
        assertEquals(createdAt, post.getCreatedAt());
        assertEquals(userId, post.getUserId());
        assertEquals(userEmail, post.getUserEmail());
        assertEquals(userUsername, post.getUserUsername());
        assertEquals(userImage, post.getUserImage());
        assertEquals(userName, post.getUserName());
        assertEquals(commentIds, post.getCommentIds());
        assertEquals(likedByUsers, post.getLikedByUsers());
    }
}

