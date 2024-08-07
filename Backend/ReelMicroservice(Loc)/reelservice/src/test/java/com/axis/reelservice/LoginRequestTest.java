package com.axis.reelservice;

import com.axis.reelservice.request.LoginRequest;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class LoginRequestTest {

    @Test
    public void testNoArgsConstructor() {
        LoginRequest loginRequest = new LoginRequest();
        assertNull(loginRequest.getEmail());
        assertNull(loginRequest.getPassword());
    }

    @Test
    public void testAllArgsConstructor() {
        LoginRequest loginRequest = new LoginRequest("test@example.com", "password123");
        assertEquals("test@example.com", loginRequest.getEmail());
        assertEquals("password123", loginRequest.getPassword());
    }

    @Test
    public void testSettersAndGetters() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("test@example.com");
        loginRequest.setPassword("password123");
        
        assertEquals("test@example.com", loginRequest.getEmail());
        assertEquals("password123", loginRequest.getPassword());
    }

    @Test
    public void testEqualsAndHashCode() {
        LoginRequest loginRequest1 = new LoginRequest("test@example.com", "password123");
        LoginRequest loginRequest2 = new LoginRequest("test@example.com", "password123");
        
        assertEquals(loginRequest1, loginRequest2);
        assertEquals(loginRequest1.hashCode(), loginRequest2.hashCode());
    }

    @Test
    public void testToString() {
        LoginRequest loginRequest = new LoginRequest("test@example.com", "password123");
        String expectedToString = "LoginRequest(email=test@example.com, password=password123)";
        
        assertEquals(expectedToString, loginRequest.toString());
    }

    
   
    @Test
    public void testNotEqualsDifferentEmail() {
        LoginRequest loginRequest1 = new LoginRequest("test@example.com", "password123");
        LoginRequest loginRequest2 = new LoginRequest("different@example.com", "password123");

        assertNotEquals(loginRequest1, loginRequest2);
    }

    @Test
    public void testNotEqualsDifferentPassword() {
        LoginRequest loginRequest1 = new LoginRequest("test@example.com", "password123");
        LoginRequest loginRequest2 = new LoginRequest("test@example.com", "differentpassword");

        assertNotEquals(loginRequest1, loginRequest2);
    }
}

 



