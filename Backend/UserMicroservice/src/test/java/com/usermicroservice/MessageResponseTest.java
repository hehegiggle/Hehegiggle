package com.usermicroservice;


import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import com.usermicroservice.response.MessageResponse;

public class MessageResponseTest {

    @Test
    public void testEmptyConstructor() {
        MessageResponse response = new MessageResponse();
        assertEquals(null, response.getMessage());
    }

    @Test
    public void testParameterizedConstructor() {
        String message = "Test message";
        MessageResponse response = new MessageResponse(message);
        assertEquals(message, response.getMessage());
    }

    @Test
    public void testGetMessage() {
        String message = "Test message";
        MessageResponse response = new MessageResponse(message);
        assertEquals(message, response.getMessage());
    }

    @Test
    public void testSetMessage() {
        String message = "Test message";
        MessageResponse response = new MessageResponse();
        response.setMessage(message);
        assertEquals(message, response.getMessage());
    }

    @Test
    public void testToString() {
        String message = "Test message";
        MessageResponse response = new MessageResponse(message);
        String expectedString = "MessageResponse [message=" + message + "]";
        assertEquals(expectedString, response.toString());
    }
}
