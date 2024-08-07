package com.postmicroservice;


import org.junit.jupiter.api.Test;

import com.postmicroservice.dto.CommentDto;
import com.postmicroservice.dto.PostDto;
import com.postmicroservice.dto.UserDto;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class CommentDtoTest {

    @Test
    public void testNoArgsConstructor() {
        CommentDto commentDto = new CommentDto();
        assertNull(commentDto.getId());
        assertNull(commentDto.getUserDto());
        assertNull(commentDto.getContent());
        assertNull(commentDto.getPost());
        assertNull(commentDto.getCreatedAt());
        assertEquals(0, commentDto.getLikedByUsers().size());
    }

    

    @Test
    public void testSettersAndGetters() {
        CommentDto commentDto = new CommentDto();
        UserDto userDto = new UserDto();
        Set<UserDto> likedByUsers = new HashSet<>();
        PostDto postDto = new PostDto();
        LocalDateTime createdAt = LocalDateTime.now();

        commentDto.setId(1);
        commentDto.setUserDto(userDto);
        commentDto.setContent("Test content");
        commentDto.setLikedByUsers(likedByUsers);
        commentDto.setPost(postDto);
        commentDto.setCreatedAt(createdAt);

        assertEquals(1, commentDto.getId());
        assertEquals(userDto, commentDto.getUserDto());
        assertEquals("Test content", commentDto.getContent());
        assertEquals(likedByUsers, commentDto.getLikedByUsers());
        assertEquals(postDto, commentDto.getPost());
        assertEquals(createdAt, commentDto.getCreatedAt());
    }
}

