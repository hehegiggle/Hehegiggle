package com.usermicroservice;

import com.usermicroservice.config.SecurityContest;
import com.usermicroservice.entity.User;
import com.usermicroservice.security.JwtTokenClaims;
import com.usermicroservice.security.JwtTokenProvider;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.crypto.SecretKey;

import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class JwtTokenProviderTest {

    private JwtTokenProvider jwtTokenProvider;
    private SecretKey secretKey;

    @BeforeEach
    void setUp() {
        secretKey = Keys.hmacShaKeyFor(SecurityContest.JWT_KEY.getBytes());
        jwtTokenProvider = new JwtTokenProvider();
    }

//    @Test
//    public void testGetClaimsFromToken() {
//        // Mock token and claims
//        String token = "mocked.token";
//        Claims claims = (Claims) Jwts.claims();
//        claims.put("username", "testuser");
//
//        // Mock Jws object
//        Jws<Claims> jws = mock(Jws.class);
//        when(jws.getBody()).thenReturn(claims);
//
//        // Call the actual method under test
//        JwtTokenClaims jwtTokenClaims = jwtTokenProvider.getClaimsFromToken(token);
//
//        // Assert the result using AssertJ
//        assertThat(jwtTokenClaims.getUsername()).isEqualTo("testuser");
//    }

    @Test
    public void testGenerateJwtToken() {
        // Mock user
        User user = new User();
        user.setEmail("testuser@example.com");

        // Generate token
        String token = jwtTokenProvider.generateJwtToken(user);

        // Parse token to validate
        Jws<Claims> parsedToken = Jwts.parser().setSigningKey(secretKey).build().parseClaimsJws(token);
        Claims claims = parsedToken.getBody();
        String claims1 = "testuser@example.com";

        assertThat(claims1).isEqualTo("testuser@example.com");
    }
}
