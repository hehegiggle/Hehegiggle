package com.postmicroservice;

import com.postmicroservice.dto.UserDto;
import com.postmicroservice.entity.Comments;
import com.postmicroservice.entity.Post;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class CommentsTest {

    @Test
    public void testNoArgsConstructor() {
        Comments comments = new Comments();
        assertNull(comments.getCommentId());
        assertNull(comments.getUserDto());
        assertNull(comments.getContent());
        assertNull(comments.getPost());
        assertNull(comments.getCreatedAt());
        assertEquals(0, comments.getLikedByUsers().size());
    }

    @Test
    public void testAllArgsConstructor() {
        UserDto userDto = new UserDto();
        Set<UserDto> likedByUsers = new HashSet<>();
        Post post = new Post();
        LocalDateTime createdAt = LocalDateTime.now();

        Comments comments = new Comments(1, userDto, "Test content", likedByUsers, post, createdAt);

        assertEquals(1, comments.getCommentId());
        assertEquals(userDto, comments.getUserDto());
        assertEquals("Test content", comments.getContent());
        assertEquals(likedByUsers, comments.getLikedByUsers());
        assertEquals(post, comments.getPost());
        assertEquals(createdAt, comments.getCreatedAt());
    }

    @Test
    public void testSettersAndGetters() {
        Comments comments = new Comments();
        UserDto userDto = new UserDto();
        Set<UserDto> likedByUsers = new HashSet<>();
        Post post = new Post();
        LocalDateTime createdAt = LocalDateTime.now();

        comments.setCommentId(1);
        comments.setUserDto(userDto);
        comments.setContent("Test content");
        comments.setLikedByUsers(likedByUsers);
        comments.setPost(post);
        comments.setCreatedAt(createdAt);

        assertEquals(1, comments.getCommentId());
        assertEquals(userDto, comments.getUserDto());
        assertEquals("Test content", comments.getContent());
        assertEquals(likedByUsers, comments.getLikedByUsers());
        assertEquals(post, comments.getPost());
        assertEquals(createdAt, comments.getCreatedAt());
    }
}

