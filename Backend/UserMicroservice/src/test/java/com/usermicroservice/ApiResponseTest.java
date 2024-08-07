package com.usermicroservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.usermicroservice.response.ApiResponse;

 class ApiResponseTest {

    private ApiResponse apiResponse;

    @BeforeEach
    void setUp() {
        apiResponse = new ApiResponse();
    }

    @Test
    void testNoArgsConstructor() {
        ApiResponse response = new ApiResponse();
        assertNotNull(response);
    }

    @Test
    void testAllArgsConstructor() {
        ApiResponse response = new ApiResponse("Success", true);
        assertNotNull(response);
        assertEquals("Success", response.getMessage());
        assertEquals(true, response.isStatus());
    }

    @Test
    void testGettersAndSetters() {
        apiResponse.setMessage("Error");
        apiResponse.setStatus(false);

        assertEquals("Error", apiResponse.getMessage());
        assertEquals(false, apiResponse.isStatus());
    }



    @Test
    void testToString() {
        String toString = apiResponse.toString();
        assertNotNull(toString);
 
    }
}
