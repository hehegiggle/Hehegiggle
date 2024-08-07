package com.usermicroservice;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.usermicroservice.entity.User;
import com.usermicroservice.repository.UserRepository;
import com.usermicroservice.service.UserUserDetailService;

@ExtendWith(MockitoExtension.class)
public class UserUserDetailServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserUserDetailService userDetailService;

    private User testUser;

    @BeforeEach
    public void setup() {
        testUser = new User();
        testUser.setEmail("test@example.com");
        testUser.setPassword("password");
    }

    @Test
    @DisplayName("Test Load User By Username - Success Case")
    public void testLoadUserByUsername_Success() {
        // Arrange
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(testUser));

        // Act
        UserDetails userDetails = userDetailService.loadUserByUsername("test@example.com");

        // Assert
        assertNotNull(userDetails);
        assertEquals(testUser.getEmail(), userDetails.getUsername());
        assertEquals(testUser.getPassword(), userDetails.getPassword());

        verify(userRepository, times(1)).findByEmail(anyString());
    }

    @Test
    @DisplayName("Test Load User By Username - User Not Found")
    public void testLoadUserByUsername_UserNotFound() {
        // Arrange
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());

        // Act & Assert
        UsernameNotFoundException exception = assertThrows(UsernameNotFoundException.class,
                () -> userDetailService.loadUserByUsername("notfound@example.com"));

        assertEquals("User not found with email: notfound@example.com", exception.getMessage());

        verify(userRepository, times(1)).findByEmail(anyString());
    }


}
