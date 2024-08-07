package com.usermicroservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.Collection;
import java.util.Collections;
import java.lang.reflect.Field;
import javax.crypto.SecretKey;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import com.usermicroservice.config.JwtGenratorFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JwtGenratorFilterTest {

    private JwtGenratorFilter jwtGeneratorFilter;

    // Mocks
    private Authentication mockAuthentication;
    private SecretKey mockKey;
    private Claims mockClaims;

    @BeforeEach
    public void setup() {
        // Generate a secure key with sufficient length (256 bits)
        mockKey = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256);

        jwtGeneratorFilter = new JwtGenratorFilter(); // Create an instance without key (if no constructor change)

        // Use reflection to set the private 'key' field (if no constructor change)
        try {
            Field keyField = JwtGenratorFilter.class.getDeclaredField("key");
            keyField.setAccessible(true);
            keyField.set(jwtGeneratorFilter, mockKey);
        } catch (Exception e) {
            e.printStackTrace();
        }

        // Mock Authentication
        mockAuthentication = mock(Authentication.class);
        when(mockAuthentication.getName()).thenReturn("testuser");

        // Generate JWT token
        String jwtToken = jwtGeneratorFilter.generateToken(mockAuthentication);

        // Parse JWT token and extract claims
        Jws<Claims> jwsClaims = Jwts.parser()
                                    .setSigningKey(mockKey)
                                    .build()
                                    .parseClaimsJws(jwtToken);

        mockClaims = jwsClaims.getBody();
    }

    @Test
    public void testGenerateToken() {
        String token = jwtGeneratorFilter.generateToken(mockAuthentication);
        // Assuming the token structure and validation here
        assertEquals(true, token.length() > 0); // Replace with actual validation
    }

    @Test
    public void testGetEmailFromJwtToken() {
        String jwtToken = "Bearer " + jwtGeneratorFilter.generateToken(mockAuthentication);
        String email = jwtGeneratorFilter.getEmailFromJwtToken(jwtToken);
        assertEquals("testuser", email);
    }

    @Test
    public void testPopulateAuthorities() {
        GrantedAuthority mockAuthority = mock(GrantedAuthority.class);
        when(mockAuthority.getAuthority()).thenReturn("ROLE_USER");
        Collection<? extends GrantedAuthority> authorities = Collections.singletonList(mockAuthority);

        String result = jwtGeneratorFilter.populateAuthorities(authorities);
        assertEquals("ROLE_USER", result);
    }
}
