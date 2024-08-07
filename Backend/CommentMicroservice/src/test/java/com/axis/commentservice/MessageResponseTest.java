package com.axis.commentservice;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import com.axis.commentservice.response.MessageResponse;

public class MessageResponseTest {

    @Test
    public void testDefaultConstructor() {
        MessageResponse response = new MessageResponse();
        assertNull(response.getMessage());
    }

    @Test
    public void testConstructorWithMessage() {
        String message = "Test message";
        MessageResponse response = new MessageResponse(message);
        assertEquals(message, response.getMessage());
    }

    @Test
    public void testSetMessage() {
        String message = "New message";
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

