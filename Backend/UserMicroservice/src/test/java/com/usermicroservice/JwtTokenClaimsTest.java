package com.usermicroservice;


import org.junit.jupiter.api.Test;

import com.usermicroservice.security.JwtTokenClaims;

import static org.assertj.core.api.Assertions.assertThat;

public class JwtTokenClaimsTest {

    @Test
    public void testGettersAndSetters() {
        JwtTokenClaims jwtTokenClaims = new JwtTokenClaims();

        // Set username using setter
        jwtTokenClaims.setUsername("testuser");

        // Get username using getter and assert
        assertThat(jwtTokenClaims.getUsername()).isEqualTo("testuser");
    }
}
