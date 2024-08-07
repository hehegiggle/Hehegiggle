package com.usermicroservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.usermicroservice.DTO.UserDto;
import com.usermicroservice.entity.Post;

class PostTest {

    private Post post;

    @BeforeEach
    void setUp() {
        post = new Post();
    }

    @Test
    void testId() {
        post.setId("1");
        assertEquals("1", post.getId());
    }

    @Test
    void testCaption() {
        post.setCaption("A caption");
        assertEquals("A caption", post.getCaption());
    }

    @Test
    void testImage() {
        post.setImage("image.jpg");
        assertEquals("image.jpg", post.getImage());
    }

    @Test
    void testLocation() {
        post.setLocation("Some location");
        assertEquals("Some location", post.getLocation());
    }

    @Test
    void testCreatedAt() {
        LocalDateTime now = LocalDateTime.now();
        post.setCreatedAt(now);
        assertEquals(now, post.getCreatedAt());
    }

    @Test
    void testUser() {
        UserDto userDto = new UserDto();
        post.setUser(userDto);
        assertEquals(userDto, post.getUser());
    }

    @Test
    void testLikedByUsers() {
        Set<UserDto> likedByUsers = new HashSet<>();
        UserDto userDto = new UserDto();
        likedByUsers.add(userDto);
        post.setLikedByUsers(likedByUsers);
        assertEquals(likedByUsers, post.getLikedByUsers());
        assertTrue(post.getLikedByUsers().contains(userDto));
    }

    @Test
    void testNoArgsConstructor() {
        Post post = new Post();
        assertNotNull(post);
    }

    @Test
    void testAllArgsConstructor() {
        UserDto userDto = new UserDto("username", "name", "image.jpg", "email@example.com", 1);
        Set<UserDto> likedByUsers = new HashSet<>();
        likedByUsers.add(userDto);
        LocalDateTime now = LocalDateTime.now();

        Post post = new Post("1", "A caption", "image.jpg", "Some location", now, userDto, likedByUsers);

        assertEquals("1", post.getId());
        assertEquals("A caption", post.getCaption());
        assertEquals("image.jpg", post.getImage());
        assertEquals("Some location", post.getLocation());
        assertEquals(now, post.getCreatedAt());
        assertEquals(userDto, post.getUser());
        assertEquals(likedByUsers, post.getLikedByUsers());
        assertTrue(post.getLikedByUsers().contains(userDto));
    }

    @Test
    void testGettersAndSetters() {
        UserDto userDto = new UserDto("username", "name", "image.jpg", "email@example.com", 1);
        Set<UserDto> likedByUsers = new HashSet<>();
        likedByUsers.add(userDto);
        LocalDateTime now = LocalDateTime.now();

        post.setId("1");
        post.setCaption("A caption");
        post.setImage("image.jpg");
        post.setLocation("Some location");
        post.setCreatedAt(now);
        post.setUser(userDto);
        post.setLikedByUsers(likedByUsers);

        assertEquals("1", post.getId());
        assertEquals("A caption", post.getCaption());
        assertEquals("image.jpg", post.getImage());
        assertEquals("Some location", post.getLocation());
        assertEquals(now, post.getCreatedAt());
        assertEquals(userDto, post.getUser());
        assertEquals(likedByUsers, post.getLikedByUsers());
        assertTrue(post.getLikedByUsers().contains(userDto));
    }

   
}
