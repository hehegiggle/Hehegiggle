package com.usermicroservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.usermicroservice.response.AuthResponse;

public class AuthResponseTest {

    private AuthResponse authResponse;

    @BeforeEach
    void setUp() {
        authResponse = new AuthResponse();
    }

    @Test
    void testNoArgsConstructor() {
        AuthResponse response = new AuthResponse();
        assertNotNull(response);
    }

    @Test
    void testAllArgsConstructor() {
        AuthResponse response = new AuthResponse("jwt_token", "Success");
        assertNotNull(response);
        assertEquals("jwt_token", response.getJwt());
        assertEquals("Success", response.getMessage());
    }

    @Test
    void testGettersAndSetters() {
        authResponse.setJwt("new_jwt_token");
        authResponse.setMessage("Error");

        assertEquals("new_jwt_token", authResponse.getJwt());
        assertEquals("Error", authResponse.getMessage());
    }



    @Test
    void testToString() {
        String toString = authResponse.toString();
        assertNotNull(toString);
  
    }
}
