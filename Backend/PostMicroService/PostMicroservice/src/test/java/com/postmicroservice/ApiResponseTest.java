package com.postmicroservice;



import org.junit.jupiter.api.Test;

import com.postmicroservice.dto.ApiResponse;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class ApiResponseTest {

    @Test
    public void testNoArgsConstructor() {
        ApiResponse apiResponse = new ApiResponse();
        assertNull(apiResponse.getMessage());
        assertFalse(apiResponse.isStatus());
    }

    @Test
    public void testAllArgsConstructor() {
        ApiResponse apiResponse = new ApiResponse("Success", true);
        
        assertEquals("Success", apiResponse.getMessage());
        assertTrue(apiResponse.isStatus());
    }

    @Test
    public void testSettersAndGetters() {
        ApiResponse apiResponse = new ApiResponse();

        apiResponse.setMessage("Error");
        apiResponse.setStatus(false);

        assertEquals("Error", apiResponse.getMessage());
        assertFalse(apiResponse.isStatus());
    }
}

