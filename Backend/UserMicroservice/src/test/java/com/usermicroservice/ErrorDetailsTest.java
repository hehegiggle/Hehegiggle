package com.usermicroservice;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.time.LocalDateTime;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.usermicroservice.exception.ErrorDetails;

public class ErrorDetailsTest {

    private ErrorDetails errorDetails;

    @BeforeEach
    void setUp() {
        errorDetails = new ErrorDetails();
    }

    @Test
    void testDefaultConstructor() {
        assertNotNull(errorDetails);
    }

    @Test
    void testParameterizedConstructor() {
        LocalDateTime now = LocalDateTime.now();
        ErrorDetails errorDetails1 = new ErrorDetails("Test message", "Test details", now);
        assertEquals("Test message", errorDetails1.getMessage());
        assertEquals("Test details", errorDetails1.getDetails());
        assertEquals(now, errorDetails1.getTimestamp());
    }

    @Test
    void testGetMessage() {
        errorDetails.setMessage("Test message");
        assertEquals("Test message", errorDetails.getMessage());
    }

    @Test
    void testSetMessage() {
        errorDetails.setMessage("Test message");
        assertEquals("Test message", errorDetails.getMessage());
    }

    @Test
    void testGetDetails() {
        errorDetails.setDetails("Test details");
        assertEquals("Test details", errorDetails.getDetails());
    }

    @Test
    void testSetDetails() {
        errorDetails.setDetails("Test details");
        assertEquals("Test details", errorDetails.getDetails());
    }

    @Test
    void testGetTimestamp() {
        LocalDateTime now = LocalDateTime.now();
        errorDetails.setTimestamp(now);
        assertEquals(now, errorDetails.getTimestamp());
    }

    @Test
    void testSetTimestamp() {
        LocalDateTime now = LocalDateTime.now();
        errorDetails.setTimestamp(now);
        assertEquals(now, errorDetails.getTimestamp());
    }
}
