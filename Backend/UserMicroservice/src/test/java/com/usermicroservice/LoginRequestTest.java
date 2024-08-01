package com.usermicroservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.usermicroservice.request.LoginRequest;

public class LoginRequestTest {

    private LoginRequest loginRequest;

    @BeforeEach
    void setUp() {
        loginRequest = new LoginRequest();
    }

    @Test
    void testGettersAndSetters() {
        loginRequest.setEmail("test@example.com");
        loginRequest.setPassword("password");

        assertEquals("test@example.com", loginRequest.getEmail());
        assertEquals("password", loginRequest.getPassword());
    }

    @Test
    void testConstructor() {
        LoginRequest request = new LoginRequest();
        assertNotNull(request);
    }
}
