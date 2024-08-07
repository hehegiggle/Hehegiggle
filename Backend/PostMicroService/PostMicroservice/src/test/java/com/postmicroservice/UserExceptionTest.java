package com.postmicroservice;

import org.junit.jupiter.api.Test;

import com.postmicroservice.exception.UserException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class UserExceptionTest {

    @Test
    public void testNoArgsConstructor() {
        UserException exception = new UserException();
        assertNull(exception.getMessage());
    }

    @Test
    public void testMessageConstructor() {
        String errorMessage = "This is an error message";
        UserException exception = new UserException(errorMessage);
        assertEquals(errorMessage, exception.getMessage());
    }
}
