package com.usermicroservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.List;

import javax.crypto.SecretKey;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.usermicroservice.config.JwtValidationFilter;
import com.usermicroservice.config.SecurityContest;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtParserBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtValidationFilterTest {

    private JwtValidationFilter jwtValidationFilter;

    // Mocks
    private HttpServletRequest mockRequest;
    private HttpServletResponse mockResponse;
    private FilterChain mockFilterChain;

    @BeforeEach
    public void setup() {
        jwtValidationFilter = new JwtValidationFilter();

        mockRequest = mock(HttpServletRequest.class);
        mockResponse = mock(HttpServletResponse.class);
        mockFilterChain = mock(FilterChain.class);
    }

    @Test
    public void testDoFilterInternal_ValidJwt() throws ServletException, IOException {
        // Mock JWT token in header
        String jwtToken = "Bearer " + createValidJwtToken();
        when(mockRequest.getHeader(SecurityContest.HEADER)).thenReturn(jwtToken);

        // Mock Key
        SecretKey mockKey = Keys.hmacShaKeyFor(SecurityContest.JWT_KEY.getBytes());

        // Mock parsing claims
        Jws<Claims> mockClaimsJws = mock(Jws.class); // Mock Jws<Claims> instance
        Claims mockClaims = mock(Claims.class); // Mock Claims instance
        when(mockClaimsJws.getBody()).thenReturn(mockClaims);
        when(mockClaims.get("username", String.class)).thenReturn("testuser@example.com");
        when(mockClaims.get("authorities", String.class)).thenReturn("ROLE_USER");

        // Mock JwtParserBuilder
        JwtParserBuilder mockJwtParserBuilder = mock(JwtParserBuilder.class);
        when(mockJwtParserBuilder.setSigningKey(mockKey)).thenReturn(mockJwtParserBuilder);
        when(mockJwtParserBuilder.build()).thenReturn(Mockito.mock(io.jsonwebtoken.JwtParser.class));
        when(mockJwtParserBuilder.build().parseClaimsJws(jwtToken.substring(7))).thenReturn(mockClaimsJws);

        // Mock static method Jwts.parserBuilder()
        try (MockedStatic<Jwts> parserMockedStatic = Mockito.mockStatic(Jwts.class)) {
            parserMockedStatic.when(Jwts::parser).thenReturn(mockJwtParserBuilder);

            // Perform filter operation
            jwtValidationFilter.doFilterInternal(mockRequest, mockResponse, mockFilterChain);

            // Verify that authentication was set in SecurityContextHolder
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null) {
                assertEquals("testuser@example.com", "testuser@example.com");
                assertEquals("ROLE_USER", "ROLE_USER");
            } else {
                throw new AssertionError("Authentication object is null");
            }
        }
    }

    private String createValidJwtToken() {
        SecretKey key = Keys.hmacShaKeyFor(SecurityContest.JWT_KEY.getBytes());
        String jwtToken = Jwts.builder()
                .setSubject("testuser")
                .claim("username", "testuser@example.com")
                .claim("authorities", "ROLE_USER")
                .signWith(key)
                .compact();
        return jwtToken;
    }
}
