package com.axis.commentservice;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import com.axis.commentservice.exception.PostException;

public class PostExceptionTest {

    @Test
    public void testDefaultConstructor() {
        PostException exception = new PostException();
        assertNull(exception.getMessage());
    }

    @Test
    public void testConstructorWithMessage() {
        String message = "Test message";
        PostException exception = new PostException(message);
        assertEquals(message, exception.getMessage());
    }
}

