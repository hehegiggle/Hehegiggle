package com.axis.commentservice;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import com.axis.commentservice.exception.CommentException;

public class CommentExceptionTest {

    @Test
    public void testDefaultConstructor() {
        CommentException exception = new CommentException();
        assertNull(exception.getMessage());
    }

    @Test
    public void testConstructorWithMessage() {
        String message = "Test message";
        CommentException exception = new CommentException(message);
        assertEquals(message, exception.getMessage());
    }
}

