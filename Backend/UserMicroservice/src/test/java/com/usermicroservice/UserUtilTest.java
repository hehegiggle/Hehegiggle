package com.usermicroservice;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.usermicroservice.entity.User;
import com.usermicroservice.util.UserUtil;

public class UserUtilTest {

    private List<User> users;

    @BeforeEach
    void setUp() {
        // Initialize the list of users before each test
        users = new ArrayList<>();
    }

    @Test
    void testSortUserByNumberOfPost() {
        // Create some user objects with different follower sizes
        User user1 = new User("user1", Arrays.asList("follower1", "follower2"));
        User user2 = new User("user2", Arrays.asList("follower1", "follower2", "follower3"));
        User user3 = new User("user3", Arrays.asList("follower1"));

        // Add users to the list in an unsorted order
        users.addAll(Arrays.asList(user1, user2, user3));

        // Call the sort method
        UserUtil.sortUserByNumberOfPost(users);

        // Verify the order of users after sorting
        assertEquals("user2", users.get(0).getUsername()); // user2 should have the most followers
        assertEquals("user1", users.get(1).getUsername());
        assertEquals("user3", users.get(2).getUsername());
    }

    @Test
    void testSortUserByNumberOfPost_EmptyList() {
        // Call the sort method with an empty list
        UserUtil.sortUserByNumberOfPost(users);

        // Verify that the list remains empty after sorting
        assertEquals(0, users.size());
    }

    @Test
    void testSortUserByNumberOfPost_SingleUser() {
        // Create a single user with followers
        User user1 = new User("user1", Arrays.asList("follower1", "follower2"));
        users.add(user1);

        // Call the sort method with a single user
        UserUtil.sortUserByNumberOfPost(users);

        // Verify that the list remains unchanged (single user, so already sorted)
        assertEquals("user1", users.get(0).getUsername());
    }
}
