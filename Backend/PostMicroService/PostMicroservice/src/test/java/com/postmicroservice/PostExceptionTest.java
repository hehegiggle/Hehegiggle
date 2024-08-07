package com.postmicroservice;



import org.junit.jupiter.api.Test;

import com.postmicroservice.exception.PostException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class PostExceptionTest {

    @Test
    public void testNoArgsConstructor() {
        PostException exception = new PostException();
        assertNull(exception.getMessage());
    }

    @Test
    public void testMessageConstructor() {
        String errorMessage = "This is an error message";
        PostException exception = new PostException(errorMessage);
        assertEquals(errorMessage, exception.getMessage());
    }
}
