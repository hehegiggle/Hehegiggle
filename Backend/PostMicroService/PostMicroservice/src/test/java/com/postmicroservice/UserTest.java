package com.postmicroservice;

import com.postmicroservice.dto.UserDto;
import com.postmicroservice.entity.Post;
import com.postmicroservice.entity.User;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

public class UserTest {

    @Test
    public void testNoArgsConstructor() {
        User user = new User();
        assertNotNull(user);
    }

  

    @Test
    public void testSettersAndGetters() {
        User user = new User();
        Integer id = 1;
        String username = "testuser";
        String email = "user@example.com";
        String name = "Test User";
        String mobile = "1234567890";
        String website = "www.example.com";
        String bio = "This is a bio";
        String gender = "male";
        String image = "user.jpg";
        String password = "password123";
        Set<UserDto> follower = new HashSet<>();
        Set<UserDto> following = new HashSet<>();
        List<Post> savedPost = new ArrayList<>();

        user.setId(id);
        user.setUsername(username);
        user.setEmail(email);
        user.setName(name);
        user.setMobile(mobile);
        user.setWebsite(website);
        user.setBio(bio);
        user.setGender(gender);
        user.setImage(image);
        user.setPassword(password);
        user.setFollower(follower);
        user.setFollowing(following);
        user.setSavedPost(savedPost);

        assertEquals(id, user.getId());
        assertEquals(username, user.getUsername());
        assertEquals(email, user.getEmail());
        assertEquals(name, user.getName());
        assertEquals(mobile, user.getMobile());
        assertEquals(website, user.getWebsite());
        assertEquals(bio, user.getBio());
        assertEquals(gender, user.getGender());
        assertEquals(image, user.getImage());
        assertEquals(password, user.getPassword());
        assertEquals(follower, user.getFollower());
        assertEquals(following, user.getFollowing());
        assertEquals(savedPost, user.getSavedPost());
    }

   
}

