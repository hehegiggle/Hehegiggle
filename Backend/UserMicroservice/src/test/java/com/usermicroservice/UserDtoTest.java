package com.usermicroservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.usermicroservice.DTO.UserDto;

class UserDtoTest {

    private UserDto userDto;

    @BeforeEach
    void setUp() {
        userDto = new UserDto();
    }

    @Test
    void testUsername() {
        userDto.setUsername("testUser");
        assertEquals("testUser", userDto.getUsername());
    }

    @Test
    void testName() {
        userDto.setName("Test Name");
        assertEquals("Test Name", userDto.getName());
    }

    @Test
    void testUserImage() {
        userDto.setUserImage("testImage.jpg");
        assertEquals("testImage.jpg", userDto.getUserImage());
    }

    @Test
    void testEmail() {
        userDto.setEmail("test@example.com");
        assertEquals("test@example.com", userDto.getEmail());
    }

    @Test
    void testId() {
        userDto.setId(123);
        assertEquals(123, userDto.getId());
    }

    @Test
    void testNoArgsConstructor() {
        UserDto dto = new UserDto();
        assertNotNull(dto);
    }

    @Test
    void testAllArgsConstructor() {
        UserDto dto = new UserDto("testUser", "Test Name", "testImage.jpg", "test@example.com", 123);
        assertEquals("testUser", dto.getUsername());
        assertEquals("Test Name", dto.getName());
        assertEquals("testImage.jpg", dto.getUserImage());
        assertEquals("test@example.com", dto.getEmail());
        assertEquals(123, dto.getId());
    }

    @Test
    void testPartialArgsConstructor() {
        UserDto dto = new UserDto("testUser", "Test Name", "testImage.jpg");
        assertEquals("testUser", "testUser");
        assertEquals("Test Name", "Test Name");
        assertEquals("testImage.jpg", "testImage.jpg");
    }

    @Test
    void testGettersAndSetters() {
        userDto.setUsername("testUser");
        userDto.setName("Test Name");
        userDto.setUserImage("testImage.jpg");
        userDto.setEmail("test@example.com");
        userDto.setId(123);

        assertEquals("testUser", userDto.getUsername());
        assertEquals("Test Name", userDto.getName());
        assertEquals("testImage.jpg", userDto.getUserImage());
        assertEquals("test@example.com", userDto.getEmail());
        assertEquals(123, userDto.getId());
    }

   
}
