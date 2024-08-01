package com.axis.commentservice;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.HashSet;

import org.junit.jupiter.api.Test;

import com.axis.commentservice.dto.UserDto;
import com.axis.commentservice.entity.Post;

public class PostTest {

    @Test
    public void testDefaultConstructor() {
        Post post = new Post();
        assertNull(post.getId());
        assertNull(post.getCaption());
        assertNull(post.getImage());
        assertNull(post.getLocation());
        assertNull(post.getUser());
        assertNotNull(post.getComments());
        assertNotNull(post.getLikedByUsers());
    }

    @Test
    public void testAllArgsConstructor() {
        UserDto userDto = new UserDto("userId", "userEmail", "username", "name", "userImage");
        Post post = new Post("id", "caption", "image", "location", userDto, new ArrayList<>(), new HashSet<>());

        assertEquals("id", post.getId());
        assertEquals("caption", post.getCaption());
        assertEquals("image", post.getImage());
        assertEquals("location", post.getLocation());
        assertEquals(userDto, post.getUser());
        assertNotNull(post.getComments());
        assertNotNull(post.getLikedByUsers());
    }

    @Test
    public void testGettersAndSetters() {
        Post post = new Post();
        UserDto userDto = new UserDto("userId", "userEmail", "username", "name", "userImage");

        post.setId("id");
        post.setCaption("caption");
        post.setImage("image");
        post.setLocation("location");
        post.setUser(userDto);
        post.setComments(new ArrayList<>());
        post.setLikedByUsers(new HashSet<>());

        assertEquals("id", post.getId());
        assertEquals("caption", post.getCaption());
        assertEquals("image", post.getImage());
        assertEquals("location", post.getLocation());
        assertEquals(userDto, post.getUser());
        assertNotNull(post.getComments());
        assertNotNull(post.getLikedByUsers());
    }

    @Test
    public void testToString() {
        UserDto userDto = new UserDto("userId", "userEmail", "username", "name", "userImage");
        Post post = new Post("id", "caption", "image", "location", userDto, new ArrayList<>(), new HashSet<>());

        String expectedString = "Post{id=id, caption=caption, image='image, location=location'}";
        assertEquals(expectedString, post.toString());
    }
}

