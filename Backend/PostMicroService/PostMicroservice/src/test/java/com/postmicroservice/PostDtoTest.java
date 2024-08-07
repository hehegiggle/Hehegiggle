package com.postmicroservice;

import org.junit.jupiter.api.Test;

import com.postmicroservice.dto.CommentDto;
import com.postmicroservice.dto.PostDto;
import com.postmicroservice.dto.UserDto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class PostDtoTest {

    @Test
    public void testNoArgsConstructor() {
        PostDto postDto = new PostDto();
        assertEquals(null, postDto.getId());
        assertEquals(null, postDto.getCaption());
        assertEquals(null, postDto.getImage());
        assertEquals(null, postDto.getCreatedAt());
        assertEquals(null, postDto.getUser());
        assertTrue(postDto.getComments().isEmpty());
        assertTrue(postDto.getLiked().isEmpty());
        assertEquals(false, postDto.isLikedByRequser());
        assertEquals(false, postDto.isSavedByRequser());
    }



    @Test
    public void testSettersAndGetters() {
        PostDto postDto = new PostDto();
        Integer id = 1;
        String caption = "Test Caption";
        String image = "test.jpg";
        LocalDateTime createdAt = LocalDateTime.now();
        UserDto user = new UserDto();
        List<CommentDto> comments = new ArrayList<>();
        List<UserDto> liked = new ArrayList<>();
        boolean likedByRequser = true;
        boolean savedByRequser = true;

        postDto.setId(id);
        postDto.setCaption(caption);
        postDto.setImage(image);
        postDto.setCreatedAt(createdAt);
        postDto.setUser(user);
        postDto.setComments(comments);
        postDto.setLiked(liked);
        postDto.setLikedByRequser(likedByRequser);
        postDto.setSavedByRequser(savedByRequser);

        assertEquals(id, postDto.getId());
        assertEquals(caption, postDto.getCaption());
        assertEquals(image, postDto.getImage());
        assertEquals(createdAt, postDto.getCreatedAt());
        assertEquals(user, postDto.getUser());
        assertEquals(comments, postDto.getComments());
        assertEquals(liked, postDto.getLiked());
        assertEquals(likedByRequser, postDto.isLikedByRequser());
        assertEquals(savedByRequser, postDto.isSavedByRequser());
    }
}


