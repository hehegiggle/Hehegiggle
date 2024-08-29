package com.postmicroservice;

import org.junit.jupiter.api.Test;

import com.postmicroservice.dto.UserDto;

import static org.junit.jupiter.api.Assertions.*;

public class UserDtoTest {

    @Test
    public void testNoArgsConstructor() {
        UserDto userDto = new UserDto();
        assertNotNull(userDto);
    }

    @Test
    public void testAllArgsConstructor() {
        String username = "testuser";
        String name = "Test User";
        String image = "user.jpg";
        String email = "user@example.com";
        Integer id = 1;

        UserDto userDto = new UserDto(username, name, image, email, id);

        assertEquals(username, userDto.getUsername());
        assertEquals(name, userDto.getName());
        assertEquals(image, userDto.getImage());
        assertEquals(email, userDto.getEmail());
        assertEquals(id, userDto.getId());
    }

    @Test
    public void testSettersAndGetters() {
        UserDto userDto = new UserDto();
        String username = "testuser";
        String name = "Test User";
        String image = "user.jpg";
        String email = "user@example.com";
        Integer id = 1;

        userDto.setUsername(username);
        userDto.setName(name);
        userDto.setImage(image);
        userDto.setEmail(email);
        userDto.setId(id);

        assertEquals(username, userDto.getUsername());
        assertEquals(name, userDto.getName());
        assertEquals(image, userDto.getImage());
        assertEquals(email, userDto.getEmail());
        assertEquals(id, userDto.getId());
    }

  

   
}
