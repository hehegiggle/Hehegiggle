package com.axis.commentservice;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.axis.commentservice.dto.UserDto;

public class UserDtoTest {

    private UserDto userDto;

    @BeforeEach
    public void setUp() {
        userDto = new UserDto();
    }

    @Test
    public void testDefaultConstructor() {
        assertNotNull(userDto);
        assertNull(userDto.getId());
        assertNull(userDto.getEmail());
        assertNull(userDto.getUsername());
        assertNull(userDto.getName());
        assertNull(userDto.getUserimage());
    }

    @Test
    public void testParameterizedConstructor() {
        Integer id = 1;
        String email = "user@example.com";
        String username = "user";
        String name = "User Name";
        String userimage = "image.jpg";

        userDto = new UserDto(id, email, username, name, userimage);

        assertEquals(id, userDto.getId());
        assertEquals(email, userDto.getEmail());
        assertEquals(username, userDto.getUsername());
        assertEquals(name, userDto.getName());
        assertEquals(userimage, userDto.getUserimage());
    }

    @Test
    public void testSettersAndGetters() {
        Integer id = 1;
        String email = "user@example.com";
        String username = "user";
        String name = "User Name";
        String userimage = "image.jpg";

        userDto.setId(id);
        userDto.setEmail(email);
        userDto.setUsername(username);
        userDto.setName(name);
        userDto.setUserimage(userimage);

        assertEquals(id, userDto.getId());
        assertEquals(email, userDto.getEmail());
        assertEquals(username, userDto.getUsername());
        assertEquals(name, userDto.getName());
        assertEquals(userimage, userDto.getUserimage());
    }

    @Test
    public void testEqualsAndHashCode() {
        UserDto userDto1 = new UserDto(1, "user@example.com", "user", "User Name", "image.jpg");
        UserDto userDto2 = new UserDto(1, "user@example.com", "user", "User Name", "image.jpg");

        assertEquals(userDto1, userDto2);
        assertEquals(userDto1.hashCode(), userDto2.hashCode());

        userDto2.setId(2);
        assertNotEquals(userDto1, userDto2);
        assertNotEquals(userDto1.hashCode(), userDto2.hashCode());
    }

    @Test
    public void testToString() {
        userDto.setId(1);
        userDto.setEmail("user@example.com");
        userDto.setUsername("user");
        userDto.setName("User Name");
        userDto.setUserimage("image.jpg");

        String expected = "UserDto(id=1, email=user@example.com, username=user, name=User Name, userimage=image.jpg)";
        assertEquals(expected, userDto.toString());
    }
}

