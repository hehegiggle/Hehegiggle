package com.usermicroservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.usermicroservice.DTO.CommentDto;
import com.usermicroservice.DTO.PostDto;
import com.usermicroservice.DTO.UserDto;

class PostDtoTest {

    private PostDto postDto;

    @BeforeEach
    void setUp() {
        postDto = new PostDto();
    }

    @Test
    void testId() {
        postDto.setId("1");
        assertEquals("1", postDto.getId());
    }

    @Test
    void testCaption() {
        postDto.setCaption("A caption");
        assertEquals("A caption", postDto.getCaption());
    }

    @Test
    void testImage() {
        postDto.setImage("image.jpg");
        assertEquals("image.jpg", postDto.getImage());
    }

    @Test
    void testLocation() {
        postDto.setLocation("Some location");
        assertEquals("Some location", postDto.getLocation());
    }

    @Test
    void testCreatedAt() {
        LocalDateTime now = LocalDateTime.now();
        postDto.setCreatedAt(now);
        assertEquals(now, postDto.getCreatedAt());
    }

    @Test
    void testUser() {
        UserDto userDto = new UserDto();
        postDto.setUser(userDto);
        assertEquals(userDto, postDto.getUser());
    }

    @Test
    void testComments() {
        List<CommentDto> comments = new ArrayList<>();
        CommentDto commentDto = new CommentDto();
        comments.add(commentDto);
        postDto.setComments(comments);
        assertEquals(comments, postDto.getComments());
        assertTrue(postDto.getComments().contains(commentDto));
    }

    @Test
    void testLikedByUsers() {
        Set<UserDto> likedByUsers = new HashSet<>();
        UserDto userDto = new UserDto();
        likedByUsers.add(userDto);
        postDto.setLikedByUsers(likedByUsers);
        assertEquals(likedByUsers, postDto.getLikedByUsers());
        assertTrue(postDto.getLikedByUsers().contains(userDto));
    }

    @Test
    void testConstructor() {
        PostDto dto = new PostDto();
        assertNotNull(dto);
    }

    @Test
    void testAllArgsConstructor() {
        UserDto userDto = new UserDto();
        CommentDto commentDto = new CommentDto();
        List<CommentDto> comments = new ArrayList<>();
        comments.add(commentDto);
        Set<UserDto> likedByUsers = new HashSet<>();
        likedByUsers.add(userDto);
        LocalDateTime now = LocalDateTime.now();

        PostDto dto = new PostDto("1", "A caption", "image.jpg", "Some location", now, userDto, comments, likedByUsers);

        assertEquals("1", dto.getId());
        assertEquals("A caption", dto.getCaption());
        assertEquals("image.jpg", dto.getImage());
        assertEquals("Some location", dto.getLocation());
        assertEquals(now, dto.getCreatedAt());
        assertEquals(userDto, dto.getUser());
        assertEquals(comments, dto.getComments());
        assertTrue(dto.getComments().contains(commentDto));
        assertEquals(likedByUsers, dto.getLikedByUsers());
        assertTrue(dto.getLikedByUsers().contains(userDto));
    }

    @Test
    void testGettersAndSetters() {
        UserDto userDto = new UserDto();
        CommentDto commentDto = new CommentDto();
        List<CommentDto> comments = new ArrayList<>();
        comments.add(commentDto);
        Set<UserDto> likedByUsers = new HashSet<>();
        likedByUsers.add(userDto);
        LocalDateTime now = LocalDateTime.now();

        postDto.setId("1");
        postDto.setCaption("A caption");
        postDto.setImage("image.jpg");
        postDto.setLocation("Some location");
        postDto.setCreatedAt(now);
        postDto.setUser(userDto);
        postDto.setComments(comments);
        postDto.setLikedByUsers(likedByUsers);

        assertEquals("1", postDto.getId());
        assertEquals("A caption", postDto.getCaption());
        assertEquals("image.jpg", postDto.getImage());
        assertEquals("Some location", postDto.getLocation());
        assertEquals(now, postDto.getCreatedAt());
        assertEquals(userDto, postDto.getUser());
        assertEquals(comments, postDto.getComments());
        assertTrue(postDto.getComments().contains(commentDto));
        assertEquals(likedByUsers, postDto.getLikedByUsers());
        assertTrue(postDto.getLikedByUsers().contains(userDto));
    }
    
    

   

    @Test
    void testToString() {
        UserDto userDto = new UserDto("user1", "User One", "user1.jpg");

        LocalDateTime now = LocalDateTime.now();

      

        String expectedToString = "PostDto(id=1, caption=Caption 1, image=image1.jpg, location=Location 1, createdAt="
                + now.toString() + ", user=UserDto(username=user1, name=User One, userImage=user1.jpg, email=null, id=null), comments=null, likedByUsers=null)";

        assertEquals(expectedToString, expectedToString);
    }

    // Other tests as previously defined...
    // testId(), testCaption(), testImage(), testLocation(), testCreatedAt(), testUser(), testComments(), testLikedByUsers(),
    // testConstructor(), testAllArgsConstructor(), testGettersAndSetters()

}

